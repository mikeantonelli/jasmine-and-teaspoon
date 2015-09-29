// This class provides basic reachability event notifications.
//
// If reachability fails, reachabilityErrorEvent will be sent.
// If reachability succeeds, reachabilitySuccessEvent will be sent. 

var reachabilitySuccessEvent = 'reachability:success'
var reachabilityErrorEvent   = 'reachability:error'
var reachabilityHTTPMethod = 'HEAD'
var reachabilityEndpoint = '/health'
var reachabilityTimeout = 5000;
var reachabilityInterval;

var checkReachability = function() {
  console.info('checkReachability');
  
  stopReachability();

  $.ajax({
    url: reachabilityEndpoint,
    type: reachabilityHTTPMethod,
    cache: false,
    timeout: reachabilityTimeout,
    success: function(data, textStatus, jqXHR) {
      sendEvent(reachabilitySuccessEvent);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      sendEvent(reachabilityErrorEvent);
    },
    complete: function(jqXHR, textStatus) {
      startReachability();
    }
  });
};

var startReachability = function() {
  console.info('startReachability');

  if (!reachabilityInterval || typeof(reachabilityInterval) === 'undefined') {
    reachabilityInterval = setInterval(checkReachability, reachabilityTimeout);
  };
};

var stopReachability = function() {
  console.info('stopReachability');

  clearInterval(reachabilityInterval);
  reachabilityInterval = null;
};

var sendEvent = function(eventName) {
  console.info('sendEvent');

  document.dispatchEvent(new CustomEvent(eventName, {
    bubbles: true,
    cancelable: true
  }));
};
