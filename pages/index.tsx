import { css } from '@emotion/core';
import { Theme, useTheme } from 'theme';
import { Layout } from '../common';

const IndexPage = () => {
  const { theme, changeTheme } = useTheme();

  return (
    <Layout title="Khari Johnson | Contract Software Developer">
      <h1 className="display">Hello, World!</h1>

      <button
        onClick={() => changeTheme(theme.name === 'light' ? 'dark' : 'light')}
      >
        click Me
      </button>

      <h1
        className="display"
        css={(theme: Theme) =>
          css`
            background-color: ${theme.colors.primary};
          `
        }
      >
        primary
      </h1>
      <h1
        className="display"
        css={(theme: Theme) =>
          css`
            background-color: ${theme.colors.primary};
            color: ${theme.colors.background};
          `
        }
      >
        primary
      </h1>
      <h1
        className="display"
        css={(theme: Theme) =>
          css`
            background-color: ${theme.colors.background};
            color: ${theme.colors.primary};
          `
        }
      >
        primary
      </h1>
      <h1
        className="display"
        css={(theme: Theme) =>
          css`
            background-color: ${theme.colors.text};
            color: ${theme.colors.primary};
          `
        }
      >
        primary
      </h1>

      <h1
        className="display"
        css={(theme: Theme) =>
          css`
            background-color: ${theme.colors.secondary};
          `
        }
      >
        secondary
      </h1>
      <h1
        className="display"
        css={(theme: Theme) =>
          css`
            background-color: ${theme.colors.secondary};
            color: ${theme.colors.background};
          `
        }
      >
        secondary
      </h1>
      <h1
        className="display"
        css={(theme: Theme) =>
          css`
            background-color: ${theme.colors.background};
            color: ${theme.colors.secondary};
          `
        }
      >
        secondary
      </h1>
      <h1
        className="display"
        css={(theme: Theme) =>
          css`
            background-color: ${theme.colors.text};
            color: ${theme.colors.secondary};
          `
        }
      >
        secondary
      </h1>
      <h1
        className="display"
        css={(theme: Theme) =>
          css`
            background-color: ${theme.colors.highlight};
          `
        }
      >
        highlight
      </h1>
      <h1
        className="display"
        css={(theme: Theme) =>
          css`
            background-color: ${theme.colors.highlight};
            color: ${theme.colors.background};
          `
        }
      >
        highlight
      </h1>
      <h1
        className="display"
        css={(theme: Theme) =>
          css`
            background-color: ${theme.colors.background};
            color: ${theme.colors.highlight};
          `
        }
      >
        highlight
      </h1>
      <h1
        className="display"
        css={(theme: Theme) =>
          css`
            background-color: ${theme.colors.text};
            color: ${theme.colors.highlight};
          `
        }
      >
        highlight
      </h1>
      <h1
        className="display"
        css={(theme: Theme) =>
          css`
            background-color: ${theme.colors.muted};
          `
        }
      >
        muted
      </h1>
      <h1
        className="display"
        css={(theme: Theme) =>
          css`
            background-color: ${theme.colors.muted};
            color: ${theme.colors.background};
          `
        }
      >
        muted
      </h1>
      <h1
        className="display"
        css={(theme: Theme) =>
          css`
            background-color: ${theme.colors.background};
            color: ${theme.colors.muted};
          `
        }
      >
        muted
      </h1>
      <h1
        className="display"
        css={(theme: Theme) =>
          css`
            background-color: ${theme.colors.text};
            color: ${theme.colors.muted};
          `
        }
      >
        muted
      </h1>
      <h1
        className="display"
        css={(theme: Theme) =>
          css`
            background-color: ${theme.colors.error};
          `
        }
      >
        error
      </h1>
      <h1
        className="display"
        css={(theme: Theme) =>
          css`
            background-color: ${theme.colors.error};
            color: ${theme.colors.background};
          `
        }
      >
        error
      </h1>
      <h1
        className="display"
        css={(theme: Theme) =>
          css`
            background-color: ${theme.colors.background};
            color: ${theme.colors.error};
          `
        }
      >
        error
      </h1>
      <h1
        className="display"
        css={(theme: Theme) =>
          css`
            background-color: ${theme.colors.text};
            color: ${theme.colors.error};
          `
        }
      >
        error
      </h1>
      <h1
        className="display"
        css={(theme: Theme) =>
          css`
            background-color: ${theme.colors.success};
          `
        }
      >
        success
      </h1>
      <h1
        className="display"
        css={(theme: Theme) =>
          css`
            background-color: ${theme.colors.success};
            color: ${theme.colors.background};
          `
        }
      >
        success
      </h1>
      <h1
        className="display"
        css={(theme: Theme) =>
          css`
            background-color: ${theme.colors.background};
            color: ${theme.colors.success};
          `
        }
      >
        success
      </h1>
      <h1
        className="display"
        css={(theme: Theme) =>
          css`
            background-color: ${theme.colors.text};
            color: ${theme.colors.success};
          `
        }
      >
        success
      </h1>
      <h1
        className="display"
        css={(theme: Theme) =>
          css`
            background-color: ${theme.colors.info};
          `
        }
      >
        info
      </h1>
      <h1
        className="display"
        css={(theme: Theme) =>
          css`
            background-color: ${theme.colors.info};
            color: ${theme.colors.background};
          `
        }
      >
        info
      </h1>
      <h1
        className="display"
        css={(theme: Theme) =>
          css`
            background-color: ${theme.colors.background};
            color: ${theme.colors.info};
          `
        }
      >
        info
      </h1>
      <h1
        className="display"
        css={(theme: Theme) =>
          css`
            background-color: ${theme.colors.text};
            color: ${theme.colors.info};
          `
        }
      >
        info
      </h1>
      <h1
        className="display"
        css={(theme: Theme) =>
          css`
            background-color: ${theme.colors.warning};
          `
        }
      >
        warning
      </h1>
      <h1
        className="display"
        css={(theme: Theme) =>
          css`
            background-color: ${theme.colors.warning};
            color: ${theme.colors.background};
          `
        }
      >
        warning
      </h1>
      <h1
        className="display"
        css={(theme: Theme) =>
          css`
            background-color: ${theme.colors.background};
            color: ${theme.colors.warning};
          `
        }
      >
        warning
      </h1>
      <h1
        className="display"
        css={(theme: Theme) =>
          css`
            background-color: ${theme.colors.text};
            color: ${theme.colors.warning};
          `
        }
      >
        warning
      </h1>
      <h1
        className="display"
        css={(theme: Theme) =>
          css`
            background-color: ${theme.colors.text};
          `
        }
      >
        text
      </h1>
      <h1
        className="display"
        css={(theme: Theme) =>
          css`
            background-color: ${theme.colors.text};
            color: ${theme.colors.background};
          `
        }
      >
        text
      </h1>
      <h1
        className="display"
        css={(theme: Theme) =>
          css`
            background-color: ${theme.colors.background};
            color: ${theme.colors.text};
          `
        }
      >
        text
      </h1>
      <h1
        className="display"
        css={(theme: Theme) =>
          css`
            background-color: ${theme.colors.text};
            color: ${theme.colors.text};
          `
        }
      >
        text
      </h1>
      <h1
        className="display"
        css={(theme: Theme) =>
          css`
            background-color: ${theme.colors.background};
          `
        }
      >
        background
      </h1>
      <h1
        className="display"
        css={(theme: Theme) =>
          css`
            background-color: ${theme.colors.background};
            color: ${theme.colors.background};
          `
        }
      >
        background
      </h1>
      <h1
        className="display"
        css={(theme: Theme) =>
          css`
            background-color: ${theme.colors.background};
            color: ${theme.colors.background};
          `
        }
      >
        background
      </h1>
      <h1
        className="display"
        css={(theme: Theme) =>
          css`
            background-color: ${theme.colors.text};
            color: ${theme.colors.background};
          `
        }
      >
        background
      </h1>
    </Layout>
  );
};

export default IndexPage;
