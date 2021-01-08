import { GithubData } from 'pages/api/github';
import React from 'react';

export const GithubStats = () => {
  const [{ status, data, errors }, setState] = React.useState<{
    status: 'idle' | 'pending' | 'fulfilled' | 'error';
    data?: GithubData;
    errors?: Error[];
  }>({
    status: 'idle',
  });

  const fetchData = async () => {
    if (status !== 'pending') {
      setState({ status: 'pending' });

      const result = await fetch(process.env.APP_URL + '/api/github');
      const { data, errors } = (await result.json()) as {
        data?: GithubData;
        errors: Error[];
      };

      if (errors) {
        return setState((prev) => ({ ...prev, status: 'error', errors }));
      }

      return setState((prev) => ({ ...prev, status: 'fulfilled', data }));
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  if (errors) {
    return (
      <pre>GitHub Error: {errors.map((error) => error.message).join(', ')}</pre>
    );
  }

  return data ? (
    <ul>
      <li className="text-3xl mt-4">Github</li>
      <li>Stars: {data.stars}</li>
      <li>Profile Image: {data.user.avatar_url}</li>
      <li>Repo Count: {data.user.public_repos}</li>
      <li>
        Repos
        <ul>
          {data.repos.map((repo) => (
            <li>
              <a href={repo.html_url} target="_new">
                {repo.full_name}
              </a>
            </li>
          ))}
        </ul>
      </li>
    </ul>
  ) : (
    <div>Loading...</div>
  );
};
