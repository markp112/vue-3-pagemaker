# pagemaker-v3

A work in progress project that will allow a user to build a website.

The original idea for this came whenmy wife wanted to be able to create a website, this inspired me to start a side project to do just that.

This project has a number of purposes and whilst the primary remains to create a tool that will allow the user to create a website it also serves as a learning platform for me to build on my skills and if of sufficient complexity that it throws up real world challenges such as when I wanted to create a text editor which meant getting to grips with the DOM range, and whilst I could have imported an npm package to provide this capability I would not have had the learning benefit.




## Project setup
1) Clone the project from the master branch and not main
2) Run yarn install - do not use npm as this project uses both TailwindCSS and Storybook and npm is unable to resolve the conflicts.
3) the application connects to google firebase, a firebase project will need to be created and once setup this application expects to find the firebase credentials in the firebase/config.ts file. The application requires the following keys:

export const secrets = {
  google: {
    fontsAPIKey: '',
    apiKey: '',
    authDomain: '',
    databaseURL: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
    measurementId: ''
 },
  testing: {
    secret: ''
  }

These can be obtained via the firebase console by via the settings Project settings SDK setup and configuration and selecting config.
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Run your unit tests
```
yarn test:unit
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
