describe('Pinocchio.Promisable.Collection', function() {

  var App = new Marionette.Application();
  App.module('Entities', Pinocchio.Promisable);

  describe('fetched collection', function() {
    var collection;

    beforeEach(function() {
      collection = new App.Entities.Promisable.Collection([]);
    });

    describe('when initialized', function() {
      it('is not resolved', function() {
        expect(collection.isResolved()).to.not.be.true();
      });
    });
  });

  describe('static collection', function() {
    var collection;

    beforeEach(function() {
      collection = new App.Entities.Promisable.Collection.Static([]);
    });

    describe('when initialized', function() {
      it('is resolved', function() {
        expect(collection.isResolved()).to.be.true();
      });
    });
  });

});
