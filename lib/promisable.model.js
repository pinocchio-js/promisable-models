var Pinocchio = Pinocchio || {};

Pinocchio.Promisable = Marionette.Module.extend({
  startWithParent: true,

  initialize: function() {
    this.Promisable = {};
    var Module = this.Promisable;

    Module.Mixin = function() {
      this._deferred = jQuery.Deferred();

      this.listenTo(this, 'sync', function() {
        this._deferred.resolve();
      });

      this.listenTo(this, 'error', function(model, xhr, options) {
        this._deferred.reject(model, xhr, options);
      });

      // Proxy Promises methods
      this.done = this._deferred.done;
      this.fail = this._deferred.fail;
      this.then = this._deferred.then;

      // Helper Methods for handling promises
      this.isResolved = function() {
        return this._deferred.state() == 'resolved';
      };

      this.isRejected = function() {
        return this._deferred.state() == 'rejected';
      };

      var oldFetch = this.fetch;
      this.fetch = function() {
        var xhr = oldFetch.apply(this, arguments);

        this.abort = function() {
          xhr.abort();

          return this;
        };

        return xhr;
      }
    };

    Module.Model = Backbone.Model.extend({
      constructor: function() {
        Backbone.Model.apply(this, arguments);
        Module.Mixin.apply(this, arguments);
      }
    });

    Module.Collection = Backbone.Collection.extend({
      constructor: function() {
        Backbone.Collection.apply(this, arguments);
        Module.Mixin.apply(this, arguments);
      }
    });

  }
});