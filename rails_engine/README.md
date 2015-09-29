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
