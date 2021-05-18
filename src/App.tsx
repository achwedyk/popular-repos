import {ApolloProvider} from '@apollo/client/react';
import React, {useState} from 'react';

import 'src/App.css';

import {Header} from 'src/components/Header';
import {Message} from 'src/components/Message';
import {FilteredRepoList} from 'src/components/RepoList';
import {SearchBox} from 'src/components/SearchBox';

import {getApolloClient, GITHUB_TOKEN} from './utils';
import * as text from 'src/text.json'

const App = () => {
  const [searchTerm, setSearchTerm] = useState<string>('react')

  if (!GITHUB_TOKEN) {
    return <Message label={text.TOKEN_MISSING}/>
  }

  return (
    <ApolloProvider client={getApolloClient()}>
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
