describe('Marionette.Promisable', function() {
  
  var App = new Marionette.Application();
  App.module('Entities', Pinocchio.Promisable);

  var TestModel = Backbone.Model.extend({
    paramRoot: 'test',
    url: '/test',

    initialize: function() {
      App.Entities.Promisable.Mixin.call(this);
    }
  });

  describe('promise interface', function() {
    var promisedModel = new TestModel();

    it('responds to done', function() {
      expect(promisedModel.done).to.be.ok();
    });

    it('responds to fail', function() {
      expect(promisedModel.fail).to.be.ok();
    });

    it('responds to then', function() {
      expect(promisedModel.then).to.be.ok();
    });
  });

  describe('isResolved', function() {
    var promisedModel = new TestModel();

    describe('when initialized', function() {

      it('returns false', function() {
        expect(promisedModel.isResolved()).to.not.be.true;
      });
    });

    describe('when resolved', function() {
      it('returns true', function() {
        promisedModel._deferred.resolve();

        expect(promisedModel.isResolved()).to.be.true;
      });
    });
  });

});
