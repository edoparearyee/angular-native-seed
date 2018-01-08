# Angular Native Seed

[![CircleCI][circleci-badge]][circleci]
[![Coverage Status][coveralls-badge]][coveralls]
[![Commitizen friendly][commitizen-badge]][commitizen]

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Server side rendering

The site can be rendered on a server before serving pages to the client. Server side rendering is achieved using [Express][express] and [Angular Universal][angular-universal] with [Express][express] running a [node][nodejs] server and [@nguniversal/express-engine][@nguniversal] providing a template engine for [Express][express] to render the angular pages.

Run `npm run build:ssr && npm run serve:ssr` to build client and server bundles and run an express app which will render the angular templates before being sent to the client. Navigate to `http://localhost:4000/` to view the SSR version of the app.


## Running unit tests

Run `ng test` to execute the unit tests via [Karma][karma].

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor][protractor].

## Making Commits

This repo uses [Commitizen CLI][commitizen] and [Conventional Changelog][conventional-changelog] to create commits and generate changelogs. Instead of running `git commit` run `git cz` and follow the prompts. Changelogs will then be generated when creating new releases by running `npm run release`.

## Making Releases

Run `npm run release` to create a new release. This will use [Standard Version][standard-version] to create a new release. [Standard Version][standard-version] will generate / update the changelog based on commits generated using [Commitizen CLI][commitizen], update the version number following semantic versioning rules and then commit and tag the commit for the release. Simply run `git push --follow-tags origin master`.

## Docker

To build a Docker image locally run first build the client and server bundles as well as the express app by running `npm run build:ssr`. Then to build the image run:

```
docker build -t angular-native-seed:latest .
```

To run the docker image simply do:

```
docker run -d -p 4000:4000 angular-native-seed:latest
```

Navigate to `http://localhost:4000/` to view the server side rendered version of the app running in a Docker image



## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README][angular-cli-readme].

[circleci]:https://circleci.com/gh/edoparearyee/angular-native-seed
[circleci-badge]:https://circleci.com/gh/edoparearyee/angular-native-seed.svg?style=shield
[coveralls]:https://coveralls.io/github/edoparearyee/angular-native-seed?branch=master
[coveralls-badge]:https://coveralls.io/repos/github/edoparearyee/angular-native-seed/badge.svg?branch=master
[commitizen]:http://commitizen.github.io/cz-cli/
[commitizen-badge]:https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[conventional-changelog]:https://github.com/conventional-changelog/conventional-changelog
[standard-version]:https://github.com/conventional-changelog/standard-version
[Karma]:https://karma-runner.github.io
[Protractor]:http://www.protractortest.org/
[angular-cli]:https://github.com/angular/angular-cli
[angular-cli-readme]:https://github.com/angular/angular-cli/blob/master/README.md
[express]:https://expressjs.com/
[angular-universal]:https://github.com/angular/universal
[@nguniversal]:https://github.com/angular/universal/tree/master/modules/express-engine
[nodejs]:https://nodejs.org/en/

