import React from 'react';
import {render, screen} from '@testing-library/react';
import {Repository} from 'src/utils';
import {RepoList} from './RepoList';

describe('RepoList', () => {
  describe('for no repositories', () => {
    it('renders no results message', () => {
      render(<RepoList repos={[]}/>);

      const element = screen.getByText(/No results found/i);
      expect(element).toBeInTheDocument();
    });
  });

  describe('for multiple repositories', () => {
    const repos: Array<Repository> = [
      {
        name: 'react',
        url: 'https://github.com/facebook/react',
        stars: 1500,
        forks: 100,
      },
      {
        name: 'next.js',
        url: 'https://github.com/vercel/next.js',
        stars: 230,
        forks: 40,
      }
    ]

    beforeEach(() => {
      render(<RepoList repos={repos}/>);
    })

    it('doesn\'t render no results message', () => {
      const element = screen.queryByText(/No results found/i);
      expect(element).not.toBeInTheDocument();
    });

    it('renders the links for each repository', () => {
      const {getByText} = screen;

      repos.forEach(repo => {
        const link = getByText(repo.name)
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', repo.url);
      })
    })
  })
})
