import { GitHubRateLimitInfo } from '../models/gitdata.model';

export class GitHubRateLimitError extends Error {
  rateLimitInfo: GitHubRateLimitInfo;

  constructor(info: GitHubRateLimitInfo) {
    super(
      `Limite GitHub atteinte (${info.resource}). Reprise possible a ${info.resetDate} (epoch: ${info.resetEpoch}).`
    );
    this.name = 'GitHubRateLimitError';
    this.rateLimitInfo = info;
  }
}