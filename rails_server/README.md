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

##### CI

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

##### GUI

```
  $ bundle exec rails s
```

* Open [http://localhost:3000/teaspoon](http://localhost:3000/teaspoon)

### 6. JQuery Matchers

There are a lot of helpful things that JQuery can do, but they can also be very difficult to test with pure javascript. [jasmine-jquery](https://github.com/velesin/jasmine-jquery) exists to help create custom matchers for jasmine.

It's installed in `vendor/assets/javascripts`, but in your own project [there are many ways to install the custom matchers](https://github.com/velesin/jasmine-jquery#installation).

Let's require these matchers in `rails_server/spec/javascripts/spec_helper.js`:

```javascript
//= require jasmine-jquery
```

Now let's add our first test file

```
  $ echo "describe('application', function() { pending(); });" >> spec/javascripts/application_spec.js
```

Now let's look at `application.js` in our rails_server:

```javascript
$(document).ready(function() {
  $('#reachability').hide();
  document.addEventListener(reachabilitySuccessEvent, reachabilitySuccessHandler);
  document.addEventListener(reachabilityErrorEvent, reachabilityErrorHandler);
  startReachability();
});

var reachabilitySuccessHandler = function(event) {
  $('#reachability').hide();
};

var reachabilityErrorHandler = function(event) {
  $('#reachability').show();
};
```

We've got some event bindings, and we're showing/hiding a div. Let's add a test to ensure that the div is hidden when the page loads.

```

```

[istanbul]: https://github.com/gotwarlost/istanbul
