# Popular Repos

List popular GitHub repositories.

Technologies used: React.js, TypeScript, GraphQL.

## Pre-requisites

- node.js
- yarn

## Running

### Install the project dependencies

Run the following command in the project directory:

```
yarn
```

### Obtain GitHub API token

This project uses a GraphQL GitHub API and requires a personal access token to run it.

Follow the instructions on how to [create a GitHub API token](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token).
The token needs to provide access to `public_repo` scope to access public repositories.

### Run app in the development mode

Use the token generated in the previous step and run:
```
REACT_APP_GITHUB_TOKEN='YOUR_GENERATED_TOKEN_HERE' yarn start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## More scripts

### Run app in the production mode

```
REACT_APP_GITHUB_TOKEN='YOUR_GENERATED_TOKEN_HERE' yarn build
```

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

### Testing

```
yarn test
```

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### Build and run for production with Docker

Build the app with

```
docker build . -t achwedyk/popular-repos --build-arg GITHUB_TOKEN_ARG='YOUR_GENERATED_TOKEN_HERE'
```

Run with

```
docker run -p 8080:80 achwedyk/popular-repos
```

The app should be available on [http://localhost:8080](http://localhost:8080).

## Learn More

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).