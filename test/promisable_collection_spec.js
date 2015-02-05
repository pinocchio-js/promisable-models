describe('Pinocchio.Promisable.Collection', function() {

  var App = new Marionette.Application();
  App.module('Entities', Pinocchio.Promisable);

  var TestCollection = Backbone.Collection.extend({
    paramRoot: 'test',
    url: '/test',

    initialize: function() {
      App.Entities.Promisable.Mixin.call(this);
    }
  });

  describe('promise interface', function() {
    var promisedCollection = new TestCollection();

    it('responds to done', function() {
      expect(promisedCollection.done).to.be.ok();
    });

    it('responds to fail', function() {
      expect(promisedCollection.fail).to.be.ok();
    });

    it('responds to then', function() {
      expect(promisedCollection.then).to.be.ok();
    });
  });

  describe('isResolved', function() {
    var promisedCollection = new TestCollection();

    describe('when initialized', function() {

      it('returns false', function() {
        expect(promisedCollection.isResolved()).to.not.be.true();
      });
    });

    describe('when resolved', function() {

      it('returns true', function() {
        promisedCollection._deferred.resolve();

        expect(promisedCollection.isResolved()).to.be.true();
      });
    });
  });


  describe('isRejected', function() {
    var promisedCollection = new TestCollection();

    describe('when initialized', function() {

      it('returns false', function() {
        expect(promisedCollection.isRejected()).to.not.be.true();
      });
    });

    describe('when rejected', function() {

      it('returns true', function() {
        promisedCollection._deferred.reject();

        expect(promisedCollection.isRejected()).to.be.true();
      });
    });
  });

  describe('when synced', function() {
    var promisedCollection = new TestCollection();

    it('is resolved', function() {
      promisedCollection.trigger('sync');
      expect(promisedCollection.isResolved()).to.be.true();
    });
  });

  describe('when error', function() {
    var promisedCollection = new TestCollection();

    it('is rejected', function() {
      promisedCollection.trigger('error');
      expect(promisedCollection.isRejected()).to.be.true();
    });
  });

  describe('when fetched', function() {
    var promisedCollection = new TestCollection(),
        originalPromise,
        sinonServer,
        newPromise;

    beforeEach(function() {
      sinonServer = sinon.fakeServer.create();
      sinonServer.respondWith("GET", "/test", [200, {"Content-Type": "application/json"}, '{}']);
    });

    afterEach(function() {
      sinonServer.restore();
    });

    it('creates a new promise', function() {
      promisedCollection.trigger('sync');

      originalPromise = promisedCollection._deferred;
      expect(originalPromise.state()).to.equal('resolved');

      promisedCollection.fetch();
      expect(originalPromise.state()).to.equal('resolved');

      newPromise = promisedCollection._deferred;
      expect(newPromise.state()).to.equal('pending');

      sinonServer.respond();
      expect(newPromise.state()).to.equal('resolved');

      expect(originalPromise).to.not.equal(newPromise);
    });
  });

  describe('abort request', function() {
    var promisedCollection, sinonServer;

    beforeEach(function() {
      promisedCollection = new TestCollection();
      sinonServer = sinon.fakeServer.create();
      sinonServer.respondWith("GET", "/test", [200, {"Content-Type": "application/json"}, '{}']);
    });

    afterEach(function() {
      sinonServer.restore();
    });

    it('creates the method abort after fetch', function() {
      expect(promisedCollection.abort).to.be.undefined();

      promisedCollection.fetch();
      expect(promisedCollection.abort).to.not.be.undefined();
    });

    it('aborts the request programatically', function() {
      var xhr = promisedCollection.fetch(),
          spy = sinon.spy(xhr, 'abort');

      promisedCollection.abort();
      expect(spy).to.have.been.called;

      xhr.abort.restore();
    });
  });
});
