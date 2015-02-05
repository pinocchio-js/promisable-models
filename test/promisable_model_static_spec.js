describe('Pinocchio.Model', function() {

  var App = new Marionette.Application();
  App.module('Entities', Pinocchio.Promisable);

  describe('fetched model', function() {
    var model;

    beforeEach(function() {
      model = new App.Entities.Promisable.Model([]);
    });

    describe('when initialized', function() {
      it('is not resolved', function() {
        expect(model.isResolved()).to.not.be.true();
      });
    });
  });

  describe('static model', function() {
    var model;

    beforeEach(function() {
      model = new App.Entities.Promisable.Model.Static([]);
    });

    describe('when initialized', function() {
      it('is resolved', function() {
        expect(model.isResolved()).to.be.true();
      });
    });
  });

});
