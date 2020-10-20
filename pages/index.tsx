import { css, SerializedStyles } from '@emotion/core';
import { Layout } from 'common';
import { motion } from 'framer-motion';
import { FaGithub, FaGitlab, FaLinkedin, FaTwitter } from 'react-icons/fa';
import {
  easing,
  easingCrazy,
  fadeInDown,
  fadeInUp,
  listAnimation,
  listChildAnimation,
  Theme,
} from 'theme';

const styles: { [key: string]: (theme: Theme) => SerializedStyles } = {
  container: (theme) => css`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 5% auto;
    padding: 10% 5%;
    box-shadow: ${theme.shadows['xl']};
    border-radius: ${theme.radii['lg']};
    max-width: 80vw;

    @media screen and (min-width: ${theme.space['2xl']}) {
      flex-direction: row;
    }
  `,
  image: (theme) => css`
    flex: 1 1 30%;
    display: block;
    border-radius: ${theme.radii['lg']};
  `,
  body: () => css`
    flex: 1 1 70%;
    text-align: center;
  `,
  title: () => css``,
  subtitle: (theme) => css`
    font-weight: ${theme.fontWeights.bold};
  `,
  tagline: () => css`
    max-width: 60ch;
    margin: 0 auto;
  `,
  buttonContainer: (theme) => css`
    margin: ${theme.space[4]} auto;
    flex: 1 1 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  link: (theme) => css`
    cursor: pointer;
    margin: ${theme.space[2]} ${theme.space[4]};
    background-color: ${theme.colors.primary};
    color: ${theme.colors.background};
    font-weight: ${theme.fontWeights.bold};
    text-transform: uppercase;

    padding: ${theme.space[2]} ${theme.space[4]};
    display: flex;
    align-items: center;
    border-radius: ${theme.radii['lg']};
    transition: all 350ms cubic-bezier(${easingCrazy.join(',')});

    &:hover {
      color: ${theme.colors.primary};
      background-color: ${theme.colors.background};
    }
  `,
  smList: (theme) => css`
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
    max-width: ${theme.space['xl']};
    margin: ${theme.space[4]} auto;
  `,
  smItem: (theme) => css`
    a {
      padding: ${theme.space[2]} ${theme.space[4]};
      display: flex;
      align-items: center;
      color: ${theme.colors.text};
      border-radius: ${theme.radii['lg']};
      transition: all 150ms cubic-bezier(${easing.join(',')});

      svg {
        height: 100%;
        width: 100%;
        margin-right: ${theme.space[2]};
        color: ${theme.colors.primary};
        transition: all 150ms cubic-bezier(${easing.join(',')});
      }

      &:hover {
        color: ${theme.colors.primary};

        svg {
          transform: scale(1.2);
        }
      }

      &:focus {
        svg {
          transform: scale(0.8);
        }
      }
    }
  `,
};

const IndexPage = () => (
  <Layout title="Khari Johnson | Contract Software Developer">
    <section css={styles.container}>
      <div css={styles.body}>
        <motion.h1 variants={fadeInDown} css={styles.title}>
          Khari Johnson
        </motion.h1>
        <motion.p css={styles.subtitle} variants={fadeInDown}>
          Software Developer
        </motion.p>

        <motion.p css={styles.tagline} variants={fadeInDown}>
          Lover of adrenaline and good stories. Currently residing in
          Gainesville, FL solving problems with code.
        </motion.p>

        <div css={styles.buttonContainer}>
          <motion.a
            css={styles.link}
            href="https://calendly.com/gvempire/discover"
            target="_new"
            rel="noreferer noopener"
            variants={fadeInUp}
          >
            Contact
          </motion.a>

          <motion.a
            css={styles.link}
            href="https://gvempire.dev"
            variants={fadeInUp}
          >
            GVEMPIRE
          </motion.a>
        </div>

        <motion.ul css={styles.smList} variants={listAnimation}>
          {[
            {
              text: 'Github',
              href: 'https://github.com/tkjohnson121',
              Icon: FaGithub,
            },
            {
              text: 'Gitlab',
              href: 'https://gitlab.com/tkjohnson121',
              Icon: FaGitlab,
            },
            {
              text: 'Twitter',
              href: 'https://twitter.com/tkjohnson121',
              Icon: FaTwitter,
            },
            {
              text: 'LinkedIn',
              href: 'https://linkedin.com/in/khari-johnson',
              Icon: FaLinkedin,
            },
          ].map(({ text, href, Icon }) => (
            <motion.li
              css={styles.smItem}
              variants={listChildAnimation}
              key={text}
            >
              <a href={href} rel="noreferrer noopener" target="_new">
                <Icon /> {text}
              </a>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  </Layout>
);

export default IndexPage;
