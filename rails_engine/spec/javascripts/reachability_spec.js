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

});

