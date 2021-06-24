# ceva24.dev

[![build](https://github.com/ceva24/ceva24.dev/actions/workflows/build.yml/badge.svg)](https://github.com/ceva24/ceva24.dev/actions/workflows/build.yml)
[![end-to-end tests](https://github.com/ceva24/ceva24.dev/actions/workflows/test-e2e.yml/badge.svg)](https://github.com/ceva24/ceva24.dev/actions/workflows/test-e2e.yml)
[![code formatting](https://github.com/ceva24/ceva24.dev/actions/workflows/check-format.yml/badge.svg)](https://github.com/ceva24/ceva24.dev/actions/workflows/check-format.yml)
[![linting](https://github.com/ceva24/ceva24.dev/actions/workflows/lint.yml/badge.svg)](https://github.com/ceva24/ceva24.dev/actions/workflows/lint.yml)
[![type checking](https://github.com/ceva24/ceva24.dev/actions/workflows/check-types.yml/badge.svg)](https://github.com/ceva24/ceva24.dev/actions/workflows/check-types.yml)
[![performance checks](https://github.com/ceva24/ceva24.dev/actions/workflows/check-performance.yml/badge.svg)](https://github.com/ceva24/ceva24.dev/actions/workflows/check-performance.yml)

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)
[![Cypress.io](https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg)](https://www.cypress.io/)
[![This project is using Percy.io for visual regression testing.](https://percy.io/static/images/percy-badge.svg)](https://percy.io/788e43c2/ceva24.dev)
[![GitHub](https://img.shields.io/github/license/ceva24/ceva24.dev?color=blue)](https://github.com/ceva24/ceva24.dev/blob/main/LICENSE)

## Introduction

Static website built with TypeScript and [Gatsby](https://www.gatsbyjs.org/), hosted at [https://ceva24.dev](https://ceva24.dev).

## Development

Uses [Husky](https://typicode.github.io/husky/#/) for pre-commit hooks, just run `npm run prepare` first 🐶 _woof_!

Uses the [gatsby-remark-highlights](https://github.com/amitpatra/gatsby-remark-highlights) plugin for rendering syntax highlighting; Atom theme styles are in `src/styles/highlights.css`.

## CI/CD

Uses [LHCI](https://github.com/GoogleChrome/lighthouse-ci) for performance checks 🚦 [Percy](https://percy.io/788e43c2/ceva24.dev) for visual testing 🦔 Reports and snapshots included on each PR ✔️

Continuously deployed using [AWS Amplify](https://aws.amazon.com/amplify/) 🚀
