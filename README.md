# Renovation

This project is a demo of a survey that will help you renovate your bathroom. It uses  [Angular](https://angular.io/) and [Angular Material](https://material.angular.io/).

## [Live Demo](https://renovation.gritchou.dev/)

## Development server

If it is your first installation, run `npm install`.

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Debug mode

To display states of the survey, set `DEBUG = true` in stepper.component.ts

## Survey's workflow

Here is the user's workflow threw the survey:

![workflow](https://mermaid.ink/img/eyJjb2RlIjoiZ3JhcGggVERcbiAgQVtEbyB5b3Uga25vdyB0aGUgZGltZW5zaW9ucyBvZiB0aGUgYmF0aHJvb20gdG8gcmVub3ZhdGU_XSAtLT58WWVzfCBCW0xlbmd0aCArIFdpZHRoXVxuICBBIC0tPnxOb3wgQ1tGdXJuaXR1cmUgdG8gaW5zdGFsbDogQmF0aHR1YiwgU2luaywgQ2FiaW5ldF1cbiAgQiAtLT58VmFsaWRhdGlvbnwgQ1xuICBDIC0tPnxBdCBsZWFzdCBvbmUgY2hvaWNlIHZhbGlkYXRlZCwgZXJyb3IgaWYgbm90fCBEW0Zsb29yaW5nOiBQYXJxdWV0LCBUaWxlcywgV2F4ZWQgY29uY3JldGVdXG4gIEQgLS0-fFVuaXF1ZSBjaG9pY2UsIGVycm9yIGlmIG5vdGhpbmcgc2VsZWN0ZWR8IEVbRXN0aW1hdGVdIiwibWVybWFpZCI6eyJ0aGVtZSI6ImRlZmF1bHQifSwidXBkYXRlRWRpdG9yIjpmYWxzZX0)

## Estimate Algorythme

- Bathtub = 1000 €
- Sink = 100 €
- Cabinet = 250 €
- Floor (If the room dimensions are known) = length (m) * width (m) * chosen material price (m²) €
- Floor (If the room dimensions are unknown) = 2000 €
- Parquet = 25 € / m²
- Tiles = 15 € / m²
- Waxed concrete = 40 € / m²
