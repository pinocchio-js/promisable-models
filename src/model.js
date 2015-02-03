Module.Model = Backbone.Model.extend({
  constructor: function() {
    Backbone.Model.apply(this, arguments);
    Module.Mixin.apply(this, arguments);
  }
});
