Module.Collection = Backbone.Collection.extend({
  constructor: function() {
    Backbone.Collection.apply(this, arguments);
    Module.Mixin.apply(this, arguments);
  }
});
