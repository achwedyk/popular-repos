import {setContext} from "@apollo/client/link/context";
import React, {useEffect, useRef, useState} from 'react';
import {ApolloClient, createHttpLink, InMemoryCache} from '@apollo/client'
import {ApolloProvider} from '@apollo/client/react';

import './App.css';

import {Repository, useReposQuery} from "./utils";
import * as text from './text.json'

interface HeaderProps {
  title: string
}

const Header = ({title}: HeaderProps) => <header className="App-header">{title}</header>

interface MessageProps {
  label: string
}

const Message = ({label}: MessageProps) => <div className="Message">{label}</div>

const RepoListItem = ({name, url, stars, forks}: Repository) => (
  <li className="RepoList-Item">
    <a href={url}>{name}</a> - 🌟 {stars} - 🍴{forks}
  </li>
)

interface RepoListProps {
  repos: Array<Repository>
}

const RepoList = ({repos}: RepoListProps) => {
  if (repos.length === 0) {
    return <Message label={text.NO_RESULTS}/>
  }

  return <div className="RepoList">
    {repos.map((repo) =>
      <RepoListItem key={repo.name} {...repo}/>
    )}
  </div>
}

interface FilteredRepoListProps {
  searchTerm: string
}

const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

const authLink = setContext((_, {headers}) => ({
    headers: {
      ...headers,
      authorization: GITHUB_TOKEN ? `Bearer ${GITHUB_TOKEN}` : "",
    }
  }
));

const httpLink = createHttpLink({
  uri: 'https://api.github.com/graphql',
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

const FilteredRepoList = ({searchTerm}: FilteredRepoListProps) => {
  const {loading, error, data} = useReposQuery(searchTerm)

  if (loading) {
    return <Message label={text.LOADING}/>;
  }

  if (error) {
    return <Message label={text.ERROR}/>;
  }

  return <RepoList repos={data}/>
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

  if (!GITHUB_TOKEN) {
    return <Message label={text.TOKEN_MISSING}/>
  }

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Header title={text.HEADER}/>
        <main className="App-content">
          <SearchBox value={searchTerm} onChange={value => setSearchTerm(value)}/>
          <FilteredRepoList searchTerm={searchTerm}/>
        </main>
      </div>
    </ApolloProvider>
  );
}

export default App;
