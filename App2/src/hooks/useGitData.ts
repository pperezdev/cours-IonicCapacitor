import { GitData, GitDataLanguage, GitHubRateLimitInfo } from '../domain/models/gitdata.model';
import { gitDataDefault } from '../domain/data/gitdata';
import { GitHubRateLimitError } from '../domain/errors/gitdata.error';

const GITHUB_LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Python: '#3572A5',
  Java: '#b07219',
  PHP: '#4F5D95',
  C: '#555555',
  'C++': '#f34b7d',
  Go: '#00ADD8',
  Rust: '#dea584',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  Shell: '#89e051',
  HCL: '#623CE4',
  Terraform: '#623CE4',
  SQL: '#3866f2',
  YAML: '#cb171e',
  JSON: '#f1e05a',
};

const useGitData = () => {
  const getRateLimitInfo = (response: Response): GitHubRateLimitInfo => {
    const limit = Number(response.headers.get('x-ratelimit-limit') ?? 0);
    const remaining = Number(response.headers.get('x-ratelimit-remaining') ?? 0);
    const used = Number(response.headers.get('x-ratelimit-used') ?? 0);
    const resetEpoch = Number(response.headers.get('x-ratelimit-reset') ?? 0);
    const resource = response.headers.get('x-ratelimit-resource') ?? 'unknown';

    return {
      limit,
      remaining,
      used,
      resetEpoch,
      resetDate: resetEpoch ? new Date(resetEpoch * 1000).toLocaleString('fr-FR') : 'inconnu',
      resource,
    };
  };

  const logRateLimitDebug = (info: GitHubRateLimitInfo) => {
    console.log('[GitHub API] Rate limit');
    console.log(`- limit: ${info.limit}/h`);
    console.log(`- remaining: ${info.remaining}`);
    console.log(`- used: ${info.used}`);
    console.log(`- reset (epoch): ${info.resetEpoch}`);
    console.log(`- reset (date): ${info.resetDate}`);
    console.log(`- resource: ${info.resource}`);
  };

  const throwIfRateLimitReached = (response: Response, info: GitHubRateLimitInfo) => {
    const rateLimitReached = info.remaining <= 0 || response.status === 403;

    if (rateLimitReached) {
      throw new GitHubRateLimitError(info);
    }
  };

  const fetchGitDataLanguages = async (url: string): Promise<GitDataLanguage[]> => {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Erreur récupération languages");
    const data = await response.json();
    return Object.keys(data).map((key) => ({
      name: key,
      size: data[key] as number,
      color: GITHUB_LANGUAGE_COLORS[key] ?? '#6e7681',
    }));
  };

  const fetchGitReposLink = async (username: string, debug: boolean = false) => {
    const response = await fetch(`https://api.github.com/users/${username}/repos`);

    const rateLimitInfo = getRateLimitInfo(response);
    if (debug) logRateLimitDebug(rateLimitInfo);
    throwIfRateLimitReached(response, rateLimitInfo);

    if (!response.ok) throw new Error("Erreur récupération repos");
    const repos: GitData[] = await response.json();

    const gitDataWithLanguages = await Promise.all(
      repos.map(async (repo) => {
        const languages = await fetchGitDataLanguages(repo.languages_url);
        return { ...repo, languages };
      })
    );

    return gitDataWithLanguages;
  };

  return { fetchGitReposLink, gitDataDefault };
};

export default useGitData;