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

### 2. Write some tests

Let's fix that coverage we see above...

Before we start, it would probably be helpful to familiarize yourself with [jasmine's API](http://jasmine.github.io/2.0/introduction.html)

### Add a new test file

Assuming you're in rails_engine root folder

```
  $ echo "pending();" >> spec/javascripts/reachability_spec.js   
```

Now we'll run our tests, and check the output:

```
  $ bundle exec rake teaspoon
  => marked Pending
    # jasmine/2.2.0.self-36ccb16d3b8cb028dbb4ba8678e420e521189afd8d74fe536f6f321c86afeb59.js:872 -- pending
    # jasmine/2.2.0.self-36ccb16d3b8cb028dbb4ba8678e420e521189afd8d74fe536f6f321c86afeb59.js:3014 -- pending

  Finished in 0.00200 seconds
  0 examples, 0 failures

  =============================== Coverage summary ===============================
  Statements   : 41.67% ( 10/24 )
  Branches     : 0% ( 0/4 )
  Functions    : 0% ( 0/7 )
  Lines        : 41.67% ( 10/24 )
  ================================================================================  
```

Great, we've got a placeholder test.. now let's take a look at reachability.js

```javascript
...
var reachabilitySuccessEvent = 'reachability:success'
var reachabilityErrorEvent   = 'reachability:error'
var reachabilityHTTPMethod = 'HEAD'
var reachabilityEndpoint = '/health'
var reachabilityTimeout = 5000;
...
```

Let's write an easy expectations first

```
describe('reachability', function() {

  describe('reachabilitySuccessEvent', function() {
    it('equals reachability:success', function() {
      expect(reachabilitySuccessEvent).toEqual('reachability:success');
    });
  });

});
```

and re-run tests:

```
  $ bundle exec rake teaspoon
    Starting the Teaspoon server...
    Teaspoon running default suite at http://127.0.0.1:64783/teaspoon/default
    .

    Finished in 0.00400 seconds
    1 example, 0 failures

    =============================== Coverage summary ===============================
    Statements   : 41.67% ( 10/24 )
    Branches     : 0% ( 0/4 )
    Functions    : 0% ( 0/7 )
    Lines        : 41.67% ( 10/24 )
    ================================================================================ 
```

Coverage didn't change, but that's okay.. we'll get there. Can you write the rest of the tests for our other variables above?

### 3. Test dispatching events

The `sendEvent` API dispatches an event that can be bound to, let's test event dispatching.

#### Setup

Phantom-JS does not have the CustomEvent API that we're using, so let's add a shim to ensure the API is avilable.

```javascript
// spec/javascripts/spec_helper.js

// Shim required for PhantomJS
var CustomEvent = function(event, params) {
    var evt;
    params = params || {
            bubbles: false,
            cancelable: false,
        };
    evt = document.createEvent("CustomEvent");
    evt.initCustomEvent(event, params.bubbles, params.cancelable);
    return evt;
};
CustomEvent.prototype = window.Event.prototype;
window.CustomEvent = CustomEvent;
```

#### What to test?

```javascript
var sendEvent = function(eventName) {
  document.dispatchEvent(new CustomEvent(eventName, {
    bubbles: true,
    cancelable: true
  }));
};
```

Looking at the javascript we'll want to test that calling this API dispatches an event. Let's add a new test to `reachability_spec.js`.

```javascript
  describe('sendEvent', function() {
    it('dispatches an event', function() {
      sendEvent('foobar');
      pending();
    });
  });
```

To ensure that an event was dispatched, we can `spyOn` `document.dispatchEvent` and expect it `toHaveBeenCalled`.

```javascript
  describe('sendEvent', function() {
    it('dispatches an event', function() {
      spyOn(document, 'dispatchEvent');

      sendEvent('foobar');

      expect(document.dispatchEvent).toHaveBeenCalled();
    });
  });
```

Now let's re-run our tests:

```
  $ bundle exec rake teaspoon
  .....sendEvent
  .

  Finished in 0.00600 seconds
  6 examples, 0 failures

  =============================== Coverage summary ===============================
  Statements   : 50% ( 12/24 )
  Branches     : 0% ( 0/4 )
  Functions    : 14.29% ( 1/7 )
  Lines        : 50% ( 12/24 )
  ================================================================================
```

We've increased coverage, and we can see our `console.info('sendEvent')`. We can do better though, can you write a spy for `CustomEvent` to make sure the right `eventName` is passed?

### 4. Testing ajax calls

When you're testing AJAX calls, you'll want to ensure that you've tested all your branching logic, but who wants to stand up a webserver to run real integration tests?

Let's start by adding another `describe` to `reachability_spec.js`

```javascript
  describe('checkReachability', function() {
    beforeEach(function() {
      // helps with test isolation 
      stopReachability();
    });

    it('makes an ajax call', function() {
      pending();
    });

    it('dispatches reachabilitySuccessEvent on success', function() {
      pending();
    });

    it('dispatches reachabilityErrorEvent on error', function() {
      pending();
    });

    it('calls startReachability on complete', function() {
      pending();
    });   
  });
```

Since we're using jQuery in our dummy app for the first time, we'll need to add the dependency:

```ruby
# Gemfile
group :development, :test do
  gem 'jquery-rails'
end
```

We'll also need to expose it in our `spec_helper.js`

```javascript

//= require jquery

```

The first thing we'll want to test, is that the ajax call is even being made. We'll create a spy on `$` rather than `window` since this API makes use of JQuery, and let's not forget that we'll want to ensure our internal API also gets hit, using `spyOn(window, 'stopReachability')`.

Using Jasmine, we can also assert that the ajax call is made with the right configuration:

```javascript
    it('makes an ajax call', function() {
      spyOn(window, 'stopReachability');
      spyOn($, "ajax");

      checkReachability();

      expect(window.stopReachability).toHaveBeenCalled();
      expect($.ajax.calls.mostRecent().args[0].url).toEqual(reachabilityEndpoint);
      expect($.ajax.calls.mostRecent().args[0].type).toEqual(reachabilityHTTPMethod);
      expect($.ajax.calls.mostRecent().args[0].cache).toEqual(false);
      expect($.ajax.calls.mostRecent().args[0].timeout).toEqual(reachabilityTimeout);
    });
```

Now let's re-run our tests:

```
  $ bundle exec rake teaspoon
  .....sendEvent
  .stopReachability
  checkReachability
  .

  Finished in 0.00700 seconds
  7 examples, 0 failures

  =============================== Coverage summary ===============================
  Statements   : 75% ( 18/24 )
  Branches     : 0% ( 0/4 )
  Functions    : 42.86% ( 3/7 )
  Lines        : 75% ( 18/24 )
  ================================================================================
```

Coverage has been increased, but we're still missing our branching logic - we can mock the ajax responses so that we can test each branch:

```javascript
    it('dispatches reachabilitySuccessEvent on success', function() {
      spyOn(window, 'sendEvent');
      spyOn($, "ajax").and.callFake(function(e) {
        e.success({});
      });

      checkReachability();
      expect(window.sendEvent).toHaveBeenCalledWith(reachabilitySuccessEvent);
    });
```

By combining `spyOn` with `.and.callFake` we're given context to the function that was called and explicitly call the method that we want - in this case, `success`. Can you write the two other tests for `error` and `complete`?

### 5. Coverage Lies

Let's open our coverage report, located @ `rails_engine/coverage/default/index.html`

If we click through, to `reachability.js`, we'll see that `stopReachability` looks entirely covered. Jasmine and teaspoon are no different when it comes to coverage - we didn't actually write any tests for that method, but it's been hit by other tests many times.

Can you add the tests for `startReachability` and `stopReachability`?

```javascript
  describe('startReachability', function() {
    beforeEach(function() {
      stopReachability();
    });

    it('assigns reachabilityInterval when unset', function() {
      pending();
    });

    it('does not assign reachabilityInterval when set', function() {
      pending();
    });
  }); 

  describe('stopReachability', function() {
    it('invalidates the reachabilityInterval', function() {
      pending();
    });
  });
```

[istanbul]: https://github.com/gotwarlost/istanbul

