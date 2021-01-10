import { GithubData, GithubRepo } from 'pages/api/github';
import React from 'react';
import List from '../../common/list';

export const GithubStats = () => {
  const [{ status, data, errors }, setState] = React.useState<{
    status: 'idle' | 'pending' | 'fulfilled' | 'error';
    data?: GithubData;
    errors?: Error[];
  }>({
    status: 'idle',
  });

  React.useEffect(() => {
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

    fetchData();
  }, []);

  return (
    <List
      title={`Repos (${data?.user.public_repos || 0} repos | ${data?.stars ||
        0} ⭐️)`}
      values={data?.repos}
      renderValue={(repo: GithubRepo) => (
        <li key={repo.name} className="flex flex-col mr-4 mb-4 items-center">
          <a href={repo.html_url} target="_new" className="font-bold">
            {repo.name}
          </a>
        </li>
      )}
    />
  );
};
