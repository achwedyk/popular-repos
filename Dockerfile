FROM node:alpine as build-deps

ARG GITHUB_TOKEN_ARG
ENV REACT_APP_GITHUB_TOKEN=$GITHUB_TOKEN_ARG

WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build

FROM nginx:1.12-alpine
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]