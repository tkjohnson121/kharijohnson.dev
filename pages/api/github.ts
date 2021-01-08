import { NextApiRequest, NextApiResponse } from 'next';

export type GithubUser = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: false;
  name: string;
  company: string;
  blog: string;
  location: string;
  email: null;
  hireable: true;
  bio: string;
  twitter_username: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
};

export type GithubRepo = {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: false;
  owner: [Object];
  html_url: string;
  description: string;
  fork: false;
  url: string;
  forks_url: string;
  keys_url: string;
  collaborators_url: string;
  teams_url: string;
  hooks_url: string;
  issue_events_url: string;
  events_url: string;
  assignees_url: string;
  branches_url: string;
  tags_url: string;
  blobs_url: string;
  git_tags_url: string;
  git_refs_url: string;
  trees_url: string;
  statuses_url: string;
  languages_url: string;
  stargazers_url: string;
  contributors_url: string;
  subscribers_url: string;
  subscription_url: string;
  commits_url: string;
  git_commits_url: string;
  comments_url: string;
  issue_comment_url: string;
  contents_url: string;
  compare_url: string;
  merges_url: string;
  archive_url: string;
  downloads_url: string;
  issues_url: string;
  pulls_url: string;
  milestones_url: string;
  notifications_url: string;
  labels_url: string;
  releases_url: string;
  deployments_url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  git_url: string;
  ssh_url: string;
  clone_url: string;
  svn_url: string;
  homepage: string;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string;
  has_issues: true;
  has_projects: true;
  has_downloads: true;
  has_wiki: true;
  has_pages: false;
  forks_count: number;
  mirror_url: null;
  archived: false;
  disabled: false;
  open_issues_count: number;
  license: [Object];
  forks: number;
  open_issues: number;
  watchers: number;
  default_branch: string;
};

export type GithubData = {
  user: GithubUser;
  repos: Array<GithubRepo>;
  stars: number;
};

/**
 * # Github Stats
 *
 * @return {data} GithubData
 * @return {errors} Error[]
 */
export default async (_: NextApiRequest, res: NextApiResponse) => {
  const url = 'https://api.github.com/users/tkjohnson121';
  const headers = { Authorization: `token ${process.env.GITHUB_TOKEN}` };
  const userResponse = await fetch(url, { headers });
  const userReposResponse = await fetch(url + '/repos', { headers });

  if (userResponse.status !== 200) {
    return res
      .status(userResponse.status)
      .json({ errors: [await userResponse.json()] });
  }
  if (userReposResponse.status !== 200) {
    return res
      .status(userReposResponse.status)
      .json({ errors: [await userReposResponse.json()] });
  }

  const user = (await userResponse.json()) as GithubUser;
  const repositories = (await userReposResponse.json()) as Array<GithubRepo>;

  const myRepos = repositories.filter((repo) => !repo.fork);
  const stars = myRepos.reduce((accumulator, repository) => {
    return accumulator + repository['stargazers_count'];
  }, 0);

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=1200, stale-while-revalidate=600',
  );

  return res.status(200).json({ data: { user: user, repos: myRepos, stars } });
};
