# NgxUswdsLib

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.0.0.

## Library Integration

To include the `ngx-uswds-lib` library in your Angular project, you must make a few adjustments to your application's `angular.json` file.

Add/update assets to include library images, fonts, etc:
```json
"assets": [
   /* other assets */
   {
      "glob": "**/*",
      "input": "node_modules/ngx-uswds-lib/node_modules/@uswds/uswds/dist/img",
      "output": "node_modules/@uswds/uswds/dist/img"
   },
   {
      "glob": "*.*",
      "input": "node_modules/ngx-uswds-lib/node_modules/@uswds/uswds/dist/img",
      "output": "assets/img"
   },
   {
      "glob": "**/*",
      "input": "node_modules/ngx-uswds-lib/node_modules/@uswds/uswds/dist/fonts",
      "output": "node_modules/@uswds/uswds/dist/fonts"
   }
]
```

Add/update styles to include the library Sass file:
```json
"styles": [
   /* other styles */
   "node_modules/ngx-uswds-lib/sass/styles.scss"
]
```

Add/update scripts to include library Javascript file:
```json
"scripts": [
   /* other scripts */
   "node_modules/ngx-uswds-lib/node_modules/@uswds/uswds/dist/js/uswds.js"
]
```

Add/update style preprocessor options to include USWDS packages:
```json
"stylePreprocessorOptions": {
   "includePaths": [
      "./node_modules/ngx-uswds-lib/node_modules/@uswds/uswds/packages"
   ]
}
```

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the library, run:

```bash
ng build ngx-uswds-lib
```

This command will compile your project, and the build artifacts will be placed in the `dist/` directory.

### Publishing the Library

Once the project is built, you can publish your library by following these steps:

1. Navigate to the `dist` directory:
   ```bash
   cd dist/ngx-uswds-lib
   ```

2. Run the `npm publish` command to publish your library to the npm registry:
   ```bash
   npm publish
   ```

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
