## Ruby on Rails Application

This project was generated using:

``` 
  $ rails new rails_server
```

## Setup

### Install dependencies

```
  $ bundle install
```

### Run the server

```
  $ bundle exec rails s
```

### Open your browser

* [http://localhost:3000](http://localhost:3000)

### Stop your server, and look back at the browser

![connection-error](documentation/connection-error.png "Connection Error")

### Restart your server, and look at the browser

![no-error](documentation/no-error.png "No Connection Error")

## Lessons

### 1. Project Setup

#### Gemfile

Add these dependencies to your Gemfile.

```ruby
group :development, :test do
  gem 'teaspoon-jasmine'
end
```

#### Rails Generator

teaspoon provides a basic rails generator for completing project setup

```
  $ bundle install
  $ rails generate teaspoon:install
```

#### Enable Coverage (off by default)

Javascript coverage is off by default, because it requires [istanbul][istanbul] to be installed. If you've installed the package, let's turn coverage on. What we need is currently commented out, let's uncomment and modify a bit.

```ruby
# spec/teaspoon_env.rb
  config.use_coverage = 'default' # run coverage on the default suite

  config.coverage do |coverage|
    coverage.reports = ["text-summary", "html"]
    coverage.output_path = "coverage"
  end
```

#### Verify setup

```
  $ bundle exec rake teaspoon
  
  Starting the Teaspoon server...
  Teaspoon running default suite at http://127.0.0.1:61428/teaspoon/default
  startReachability


  Finished in 0.00100 seconds
  0 examples, 0 failures

  =============================== Coverage summary ===============================
  Statements   : 60.61% ( 20/33 )
  Branches     : 50% ( 2/4 )
  Functions    : 20% ( 2/10 )
  Lines        : 60.61% ( 20/33 )
  ================================================================================  
```

```
  $ bundle exec rails s
```

* Open [http://localhost:3000/teaspoon](http://localhost:3000/teaspoon)

[istanbul]: https://github.com/gotwarlost/istanbul
