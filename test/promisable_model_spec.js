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
  });

});
