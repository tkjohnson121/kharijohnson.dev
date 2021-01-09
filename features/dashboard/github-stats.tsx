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
    <>
      <p
        className="text-sm pb-4 uppercase text-left whitespace-nowrap tracking-wider"
        style={{ flex: '0 0 25%', borderBottom: '1px solid' }}
      >
        Repos ({data.user.public_repos} repos | {data.stars} ⭐️)
      </p>

      <ul className="ml-auto flex flex-wrap justify-end py-4 text-right">
        {data.repos.slice(0, 5).map((repo) => (
          <li key={repo.name} className="flex ml-8 mb-4">
            <a href={repo.html_url} target="_new" className="font-bold">
              {repo.full_name}
            </a>
          </li>
        ))}
      </ul>
    </>
  ) : (
    <div>Loading...</div>
  );
};
