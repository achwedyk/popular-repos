export interface Repository {
  name: string;
  url: string;
  stars: number;
  forks: number;
}

export const fetchRepos = (searchParam: string): Array<Repository> => {
  return [{
    name: 'React',
    url: 'https://github.com/acebook/react',
    stars: 169217,
    forks: 33901
  }, {
    name: 'Create React App',
    url: 'https://github.com/facebook/create-react-app',
    stars: 87955,
    forks: 21942
  }]
}