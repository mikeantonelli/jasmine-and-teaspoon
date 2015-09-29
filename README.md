# Learn Jasmine and Teaspoon

This project will take you from project setup to writing tests for your Ruby on Rails applications and engines using [jasmine][jasmine] and [teaspoon][teaspoon].

# Machine Setup

This project assumes the following:

* [RVM][rvm] installed
* [Homebrew][homebrew] installed
* [Phantom-JS][phantom-js] installed

```
  $ brew install phantomjs
```

* [npm][npm] installed

```
  $ brew install npm
```

* [Istanbul][istanbul] installed

```
  $ npm install -g istanbul
```

# Get Started

## Clone this repo

```
  $ git clone <repo> && cd jasmine-and-teaspoon
```

# Lessons

## 1. Project Setup

Install and configure teaspoon and jasmine.

`git checkout 1-project-setup`

### [Rails Application](rails_server#1-project-setup)
### [Rails Engine](rails_engine#1-project-setup)

## 2. Write some tests

`git checkout 2-write-some-tests`

### [reachability.js](rails_engine#2-write-some-tests)

## 3. Test event dispatching

`git checkout 3-dispatching-events`

### [reachability.js](rails_engine#3-test-dispatching-events)

## 4. Testing ajax calls

`git checkout 4-ajax`

### [reachability.js](rails_engine#4-testing-ajax-calls)

## 5. Coverage lies

`git checkout 5-coverage-lies`

### [reachability.js](rails_engine#5-coverage-lies)

[jasmine]: https://github.com/jasmine/jasmine
[teaspoon]: https://github.com/modeset/teaspoon
[rvm]: https://rvm.io/rvm/install
[homebrew]: http://brew.sh/
[phantom-js]: http://phantomjs.org/download.html
[npm]: https://docs.npmjs.com/getting-started/installing-node
[istanbul]: https://github.com/gotwarlost/istanbul

