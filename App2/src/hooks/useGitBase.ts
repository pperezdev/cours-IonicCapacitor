import { useState } from 'react';
import { GitDataWithLanguages, GitHubRateLimitInfo } from '../domain/models/gitdata.model';
import { GitHubRateLimitError } from '../domain/errors/gitdata.error';
import useGitData from './useGitData';

export type FetchDataResult =
  | { status: 'success' }
  | { status: 'empty_username' }
  | { status: 'rate_limit'; info: GitHubRateLimitInfo; timeLeft: string }
  | { status: 'error' };

const useGitBase = () => {
  const { fetchGitReposLink, gitDataDefault } = useGitData();
  const [defaultUsername, setDefaultUsername] = useState<string>('pperezdev');
  const [gitData, setGitData] = useState<GitDataWithLanguages[]>([]);

  const formatRemainingTime = (resetEpoch: number): string => {
    const nowEpoch = Math.floor(Date.now() / 1000);
    const secondsLeft = Math.max(resetEpoch - nowEpoch, 0);
    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;
    return `${minutes}m ${seconds}s`;
  };

  const fetchData = async (usernameParam?: string): Promise<FetchDataResult> => {
    const username = (usernameParam?.trim() || defaultUsername.trim());

    if (!username) {
      return { status: 'empty_username' };
    }

    try {
      const data = await fetchGitReposLink(username);
      setGitData(data);
      return { status: 'success' };
    } catch (error) {
      console.error(error);

      if (error instanceof GitHubRateLimitError) {
        const timeLeft = formatRemainingTime(error.rateLimitInfo.resetEpoch);
        setGitData(gitDataDefault);
        return { status: 'rate_limit', info: error.rateLimitInfo, timeLeft };
      }

      return { status: 'error' };
    }
  }

  return {
    defaultUsername,
    setDefaultUsername,
    gitData,
    fetchData,
  };
};

export default useGitBase;
