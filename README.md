# Privacy Vs Germs - Chrome Extension
[PrivacyVsGerms](https://devpost.com/software/privacy-vs-germs) is a Chrome extension that allows extracting your location from google maps timeline and comparing data with potentially contaminated places applying data models and recommendations.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.15.

## How To Install

#### Chrome Web Store
- [Install extension here.](https://chrome.google.com/webstore/detail/pvg/jmdhbjegpgbnlllbfcpiemhfbcfheamb?authuser=0&hl=en-GB)

#### Manual/Development

- Download the extension directly from the releases [v0.1.1](https://github.com/Neral/pvg-chrome-extension/releases/download/v0.1.1/pvg-chrome-extension.zip) and extract zip file.
- In Chrome visit [**chrome://extensions**](chrome://extensions) (via omnibox or menu -> Tools -> Extensions).
- On the extensions settings page, enable developer mode by ticking the checkbox in the upper-right corner.
- Click the now-visible **"Load unpacked extension…"** button.
- Select the directory containing your unpacked extension.

## How to Contribute

1. Clone repo and create a new branch.
2. Make changes and test.
3. Submit Pull Request with comprehensive description of changes.

## Development server

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running extention in developer mode

For the first time this app should be loaded unpacked  (`chrome://extensions/`). For upcomming changes after building the app:

1. refresh an extention in portal manually.
2. run `ng build --watch --configuration=dev` or `ng build --watch` to apply changes automatically (page refresh might be needed).

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
