Module.Collection.Static = Module.Collection.extend({
  constructor: function() {
    Module.Collection.apply(this, arguments);
    this._deferred.resolve()
  }
});
