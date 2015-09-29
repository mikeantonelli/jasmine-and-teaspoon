## Ruby on Rails Engine

This project was generated using:
```  
  $ rails plugin new rails_engine --mountable
```

## Setup

### Install dependencies

```
  $ bundle install
```

## API

#### [HEAD|GET] /health

Returns 200 (OKAY).

## Javascript

[reachability.js](app/assets/javascripts/rails_engine/reachability.js) - Provides a basic health check, on a timer, and fires events on success/failure.

## Lessons

### 1. Project Setup

#### Gemfile

Add these dependencies to your Gemfile.

```ruby
group :development, :test do
  gem 'teaspoon-jasmine'
end
```

#### Install dependencies

```
  $ bundle install
```

#### Rails Generator

teaspoon provides a Rails generator, but it won't run in a Rails engine's root. We'll take advantage of the dummy application. Also, I like Rspec more than TestUnit, so I'm going to move the dummy application that was created for us.

```
  $ mkdir spec
  $ mv test/dummy spec/dummy
  $ cd spec/dummy
  $ rails g teaspoon:install
```

We'll need to modify/move a few files so that we can run our tests from the project's root, but use the dummy app as a test harness.

```
  $ mv spec/* ../
  $ echo "require '../teaspoon_env.rb'" >> teaspoon_env.rb
```

```ruby
# rails_engine/spec/teaspoon_env.rb

unless defined?(Rails)
  ENV['RAILS_ROOT'] = File.expand_path('../dummy', __FILE__)
  require File.expand_path('../dummy/config/environment', __FILE__)
end

ENV['TEASPOON_RAILS_ENV'] = File.expand_path('../dummy/config/environment', __FILE__)

require 'rails_engine'

Teaspoon.configure do |config|
  config.root = RailsEngine::Engine.root
end
```

```ruby
# rails_engine/Rakefile

desc "Run the javascript specs"
task :teaspoon => "app:teaspoon"
```

```javascript
// rails_engine/spec/dummy/app/assets/javascripts/application.js
//
// When running tests and generating coverage, we want to pull in all the engine's assets
//
//= require rails_engine/application
```

#### Enable Coverage (off by default)

Javascript coverage is off by default, because it requires [istanbul][istanbul] to be installed. If you've installed the package, let's turn coverage on. What we need is currently commented out, let's uncomment and modify a bit.

```ruby
# spec/teaspoon_env.rb
  config.use_coverage = 'default' # run coverage on the default suite

  config.coverage do |coverage|
    coverage.reports = ['text-summary', 'html']
    coverage.output_path = 'coverage'
  end
```

#### Verify setup

##### CI

```
  $ bundle exec rake teaspoon

  Starting the Teaspoon server...
  Teaspoon running default suite at http://127.0.0.1:61428/teaspoon/default
  

  Finished in 0.00100 seconds
  0 examples, 0 failures

  =============================== Coverage summary ===============================
  Statements   : 41.67% ( 10/24 )
  Branches     : 0% ( 0/4 )
  Functions    : 0% ( 0/7 )
  Lines        : 41.67% ( 10/24 )
  ================================================================================  
```

##### GUI

The GUI needs to be run from within the engine's dummy application

```
  $ cd rails_engine/spec/dummy
  $ bundle exec rails s
```

* Open [http://localhost:3000/teaspoon](http://localhost:3000/teaspoon)

[istanbul]: https://github.com/gotwarlost/istanbul

