describe('reachability', function() {

  describe('reachabilitySuccessEvent', function() {
    it('equals reachability:success', function() {
      expect(reachabilitySuccessEvent).toEqual('reachability:success');
    });
  });

  describe('reachabilityErrorEvent', function() {
    it('equals reachability:error', function() {
      expect(reachabilityErrorEvent).toEqual('reachability:error');
    });
  });

  describe('reachabilityHTTPMethod', function() {
    it('equals HEAD', function() {
      expect(reachabilityHTTPMethod).toEqual('HEAD');
    });
  });

  describe('reachabilityEndpoint', function() {
    it('equals health', function() {
      expect(reachabilityEndpoint).toEqual('/health');
    });
  });

  describe('reachabilityTimeout', function() {
    it('equals 5000', function() {
      expect(reachabilityTimeout).toEqual(5000);
    });
  });

  describe('sendEvent', function() {
    it('dispatches an event', function() {
      spyOn(document, 'dispatchEvent');
      spyOn(window, 'CustomEvent');

      var fooEventName = 'foobar';

      sendEvent(fooEventName);
      
      expect(document.dispatchEvent).toHaveBeenCalled();
      expect(window.CustomEvent).toHaveBeenCalledWith(fooEventName, { bubbles : true, cancelable : true });
    });
  });

  describe('checkReachability', function() {
    beforeEach(function() {
      stopReachability();
    });

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

    it('dispatches reachabilitySuccessEvent on success', function() {
      spyOn(window, 'sendEvent');
      spyOn($, "ajax").and.callFake(function(e) {
        e.success({});
      });

      checkReachability();
      expect(window.sendEvent).toHaveBeenCalledWith(reachabilitySuccessEvent);
    });
  });
});

