import React, {useEffect, useRef, useState} from 'react';
import {fetchRepos, Repository} from "./utils";

import './App.css';

import * as text from './text.json'

interface HeaderProps {
  title: string
}

const Header = ({title}: HeaderProps) => <header className="App-header">{title}</header>

const RepoListItem = ({name, url, stars, forks}: Repository) => (
  <li className="RepoList-Item">
    <a href={url}>{name}</a> - 🌟 {stars} - 🍴{forks}
  </li>
)

interface RepoListProps {
  repos: Array<Repository>
}

const RepoList = ({repos}: RepoListProps) => (
  <div className="RepoList">
    {repos.map((repo) =>
      <RepoListItem key={repo.name} {...repo}/>
    )}
  </div>
)

interface FilteredRepoListProps {
  searchTerm: string
}

const FilteredRepoList = ({searchTerm}: FilteredRepoListProps) => {
  const [repos, setRepos] = useState<Array<Repository>>([])

  useEffect(() => {
    setRepos(fetchRepos(searchTerm))
  }, [searchTerm])

  return <RepoList repos={repos}/>
}

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBox = ({onChange, value}: SearchBoxProps) => {
  const inputEl = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputEl && inputEl.current) {
      inputEl.current.select()
    }
  }, [inputEl])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value)
  }

  return <div className="SearchBox">
    <label className="SearchBox-label">{text.FILTER}</label>
    <input className="SearchBox-input" ref={inputEl} autoFocus={true} value={value} onChange={handleChange}/>
  </div>
}

const App = () => {
  const [searchTerm, setSearchTerm] = useState<string>('react')

  return (
    <div className="App">
      <Header title={text.HEADER}/>
      <main className="App-content">
        <SearchBox value={searchTerm} onChange={value => setSearchTerm(value)}/>
        <FilteredRepoList searchTerm={searchTerm}/>
      </main>
    </div>
  );
}

export default App;
