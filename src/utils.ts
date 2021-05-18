import {
  ApolloClient,
  createHttpLink,
  gql,
  InMemoryCache,
  NormalizedCacheObject,
  useQuery
} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';

export interface Repository {
  name: string;
  url: string;
  stars: number;
  forks: number;
}

interface SearchEdge {
  node: {
    nameWithOwner: string;
    url: string;
    stargazerCount: number;
    forkCount: number;
  }
}

interface ReposData {
  search: {
    edges: Array<SearchEdge>
  }
}

interface ReposQueryVars {
  query: string,
  first: number
}

const transformData = (data?: ReposData): Array<Repository> => {
  if (!data) {
    return []
  }

  return data.search.edges.map((edge) => {
    const {node} = edge
    return {
      name: node.nameWithOwner,
      url: node.url,
      stars: node.stargazerCount,
      forks: node.forkCount
    }
  })
}

export const GetReposQuery = gql`
  query GetRepos($query: String!, $first: Int!) {
    search(query: $query, type: REPOSITORY, first: $first) {
      edges {
        node {
          ... on Repository {
            nameWithOwner
            url
            stargazerCount
            forkCount
          }
        }
      }
    }
  }
`;

export const useReposQuery = (searchTerm: string) => {
  const keyword = searchTerm.trim();
  const query = keyword ? `${keyword} sort:stars` : '';

  const {data, loading, error} = useQuery<ReposData, ReposQueryVars>(GetReposQuery, {
    variables: {
      query,
      first: 10
    },
    skip: !query
  })

  return {
    error,
    loading,
    data: transformData(data)
  }
}

// for unit tests provide the mock token
export const GITHUB_TOKEN = process.env.NODE_ENV === 'test' ? 'MOCK_TOKEN' : process.env.REACT_APP_GITHUB_TOKEN;

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

// return the existing Apollo Client or create one if it doesn't exist
export const getApolloClient = () => {
  if (apolloClient) {
    return apolloClient;
  }

  const authLink = setContext((_, {headers}) => ({
      headers: {
        ...headers,
        authorization: GITHUB_TOKEN ? `Bearer ${GITHUB_TOKEN}` : '',
      }
    }
  ));

  const httpLink = createHttpLink({
    uri: 'https://api.github.com/graphql',
  });


  apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });

  return apolloClient;
}