Module.Model.Static = Module.Model.extend({
  constructor: function() {
    Module.Model.apply(this, arguments);
    this._deferred.resolve()
  }
});
