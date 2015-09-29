describe('application', function() { 
  beforeEach(function() {
    fixture.load('reachability.html.erb');
  });

  describe('document.ready', function() {


    it('hides reachability error by default', function() {
      expect($('reachability')).toBeHidden();
    });
  });

});
