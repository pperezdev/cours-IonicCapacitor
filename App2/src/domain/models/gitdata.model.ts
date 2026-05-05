export interface GitPerson {
  login: string;
  avatar_url: string;
  html_url: string;
  name: string;
  bio: string;
  location: string;
  followers: number;
  following: number;
}

export interface GitData {
  name: string;
  description: string | null;
  html_url: string;
  created_at: string;
  owner: GitPerson;
  watchers_count: number;
  stargazers_count: number;
  forks_count: number;
  languages_url: string;
}

export interface GitDataLanguage {
  name: string;
  size: number;
  color: string;
}

export interface GitDataWithLanguages extends GitData {
  languages: GitDataLanguage[];
};

export interface GitHubRateLimitInfo {
  limit: number;
  remaining: number;
  used: number;
  resetEpoch: number;
  resetDate: string;
  resource: string;
}