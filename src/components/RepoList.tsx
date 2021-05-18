import React from 'react';
import {Message} from 'src/components/Message';
import * as text from 'src/text.json';
import {Repository, useReposQuery} from 'src/utils';

const RepoListItem = ({name, url, stars, forks}: Repository) => (
  <li className="RepoList-Item">
    <a href={url}>{name}</a> - 🌟 {stars} - 🍴{forks}
  </li>
)

interface RepoListProps {
  repos: Array<Repository>
}

export const RepoList = ({repos}: RepoListProps) => {
  if (repos.length === 0) {
    return <Message label={text.NO_RESULTS}/>
  }

  return <ul className="RepoList">
    {repos.map((repo) =>
      <RepoListItem key={repo.name} {...repo}/>
    )}
  </ul>
}

interface FilteredRepoListProps {
  searchTerm: string
}

export const FilteredRepoList = ({searchTerm}: FilteredRepoListProps) => {
  const {loading, error, data} = useReposQuery(searchTerm)

  if (loading) {
    return <Message label={text.LOADING}/>;
  }

  if (error) {
    return <Message label={text.ERROR}/>;
  }

  return <RepoList repos={data}/>
}