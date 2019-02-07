# ESLint plugin OTT

[![Build Status](https://travis-ci.org/jehy/eslint-plugin-ott.svg?branch=master)](https://travis-ci.org/jehy/eslint-plugin-ott)
[![dependencies Status](https://david-dm.org/jehy/eslint-plugin-ott/status.svg)](https://david-dm.org/jehy/eslint-plugin-ott)
[![devDependencies Status](https://david-dm.org/jehy/eslint-plugin-ott/dev-status.svg)](https://david-dm.org/jehy/eslint-plugin-ott?type=dev)
[![Coverage Status](https://coveralls.io/repos/github/jehy/eslint-plugin-ott/badge.svg?branch=master)](https://coveralls.io/github/jehy/eslint-plugin-ott?branch=master)
[![Known Vulnerabilities](https://snyk.io/test/github/jehy/eslint-plugin-ott/badge.svg)](https://snyk.io/test/github/jehy/eslint-plugin-ott)

Some OTT ESLint rules

## Rules

* `no-log-without-message-name` - force using `log.e()` calls with nice first arguments.
* `no-process-std` - restrict using `process.std` funcs.

## Prerequisites

Node.js (>=6.x).

## Usage

* If you don't have ESLint yet configured for your project follow [these instructions](https://github.com/eslint/eslint#installation-and-usage).
* Install `eslint-plugin-ott` using `npm` (or `yarn`) for you project:

```sh
npm install https://github.com/jehy/eslint-plugin-ott.git --save-dev # install for your project
```

* Add `eslint-plugin-ott` to the `plugins` option of your `.eslintrc`:

```json
{
  "plugins": ["ott"]
}
```


* Enable some rules:

```json
{
  "rules": {
    "ott/no-log-without-message-name": "error",
    "ott/no-process-std": "error"
  }
}
```
