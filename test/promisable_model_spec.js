describe('Pinocchio.Promisable.Model', function() {

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

    it('responds to fail', function() {
      expect(promisedModel.fail).to.be.ok();
    });

    it('responds to then', function() {
      expect(promisedModel.then).to.be.ok();
    });
  });

  describe('isResolved', function() {
    var promisedModel = new TestModel();

    describe('when initialized', function() {

      it('returns false', function() {
        expect(promisedModel.isResolved()).to.not.be.true();
      });
    });

    describe('when resolved', function() {

      it('returns true', function() {
        promisedModel._deferred.resolve();

        expect(promisedModel.isResolved()).to.be.true();
      });
    });
  });


  describe('isRejected', function() {
    var promisedModel = new TestModel();

    describe('when initialized', function() {

      it('returns false', function() {
        expect(promisedModel.isRejected()).to.not.be.true();
      });
    });

    describe('when rejected', function() {

      it('returns true', function() {
        promisedModel._deferred.reject();

        expect(promisedModel.isRejected()).to.be.true();
      });
    });
  });

  describe('when synced', function() {
    var promisedModel = new TestModel();

    it('is resolved', function() {
      promisedModel.trigger('sync');
      expect(promisedModel.isResolved()).to.be.true();
    });
  });

  describe('when error', function() {
    var promisedModel = new TestModel();

    it('is rejected', function() {
      promisedModel.trigger('error');
      expect(promisedModel.isRejected()).to.be.true();
    });
  });

  describe('when fetched', function() {
    var promisedModel = new TestModel(),
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
      promisedModel.trigger('sync');

      originalPromise = promisedModel._deferred;
      expect(originalPromise.state()).to.equal('resolved');

      promisedModel.fetch();
      expect(originalPromise.state()).to.equal('resolved');

      newPromise = promisedModel._deferred;
      expect(newPromise.state()).to.equal('pending');

      sinonServer.respond();
      expect(newPromise.state()).to.equal('resolved');

      expect(originalPromise).to.not.equal(newPromise);
    });
  });

  describe('abort request', function() {
    var promisedModel, sinonServer;

    beforeEach(function() {
      promisedModel = new TestModel();
      sinonServer = sinon.fakeServer.create();
      sinonServer.respondWith("GET", "/test", [200, {"Content-Type": "application/json"}, '{}']);
    });

    afterEach(function() {
      sinonServer.restore();
    });

    it('creates the method abort after fetch', function() {
      expect(promisedModel.abort).to.be.undefined();

      promisedModel.fetch();
      expect(promisedModel.abort).to.not.be.undefined();
    });

    it('aborts the request programatically', function() {
      var xhr = promisedModel.fetch(),
          spy = sinon.spy(xhr, 'abort');

      promisedModel.abort();
      expect(spy).to.have.been.called;

      xhr.abort.restore();
    });
  });
});
