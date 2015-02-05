var Pinocchio = Pinocchio || {};

Pinocchio.Promisable = function(module, app, Backbone, Marionette, $, _) {
  this.startWithParent = true;

  var Module = {};

  Module.Mixin = function() {
    this._deferred = jQuery.Deferred();
  
    this.listenTo(this, 'sync', function(){
      this._deferred.resolve();
    });
  
    this.listenTo(this, 'error', function(model, xhr, options){
      this._deferred.reject(model, xhr, options);
    });
  
    // Proxy Promises methods
    this.done = function() {
      return this._deferred.done.apply(this._deferred, arguments);
    };
  
    this.fail = function() {
      return this._deferred.fail.apply(this._deferred, arguments);
    };
  
    this.then = function() {
      return this._deferred.then.apply(this._deferred, arguments);
    };
  
    // Helper Methods for handling promises
    this.isResolved = function() {
      return this._deferred.state() == 'resolved';
    };
  
    this.isRejected = function() {
      return this._deferred.state() == 'rejected';
    };
  
    var oldFetch = this.fetch;
    this.fetch = function() {
      this._deferred = jQuery.Deferred();
      var xhr = oldFetch.apply(this, arguments);
  
      this.abort = function() {
        xhr.abort();
  
        return this;
      };
  
      return xhr;
    };
  };

  Module.Model = Backbone.Model.extend({
    constructor: function() {
      Backbone.Model.apply(this, arguments);
      Module.Mixin.apply(this, arguments);
    }
  });

  Module.Model.Static = Module.Model.extend({
    constructor: function() {
      Module.Model.apply(this, arguments);
      this._deferred.resolve()
    }
  });

  Module.Collection = Backbone.Collection.extend({
    constructor: function() {
      Backbone.Collection.apply(this, arguments);
      Module.Mixin.apply(this, arguments);
    }
  });

  Module.Collection.Static = Module.Collection.extend({
    constructor: function() {
      Module.Collection.apply(this, arguments);
      this._deferred.resolve()
    }
  });

  module['Promisable'] = Module;
};
