# Promisable Models

Models and Collections are a big part of every Backbone/Marionette application. This Marionette module allows Models and Collections to behave as jQuery Promises, thus eliminating the need to keep track of the XHR object returned from the ajax call.

Promisable Models can be used for example to show a "loading" message while the models/collections fetch remote data.

```js
// Asumes that the module was added in App.Entities
var person      = new App.Entities.Promisable.Model({id: 5}),
    loadingView = new MyLoadingView(),
    personView;

// Show template with "Loading" message
$('.container').html(loadingView.render().el);

person.fetch();
person.done(function() {
  personView = new PersonView({
    model: person
  });
  $('.container').html(personView.render().el)
});
```

The module also includes a static version of both models and collection, which will be resolved by default.

```js
// Asumes that the module was added in App.Entities
var person = new App.Entities.Promisable.Model.Static({id: 5, name: 'john'}),
    personView;

person.done(function() {
  personView = new PersonView({
    model: person
  });
  $('.container').html(personView.render().el)
});
```

# Installation

Get a copy of the current version of the module using Bower

```
bower install --save promisable-models
```

Add the new component to your build after including Marionette.

```html
<script src="js/backbone.marionette.js"></script>
<script src="js/promisable.model.js"></script>
```

Then you need to register the module in your application

```js
var App = new Marionette.Application();
// Register the module, in this case entities, the name is just an example,
// it can have anything that makes sense inside your application
App.module('Entities', Pinocchio.Promisable);
// Later somewhere in your app
App.start();
```

# Usage

There are two ways of using this module

1. Using the provided `Promisable.Model` and `Promisable.Collection` when creating your models and collections.
2. Using the provided `Promisable.Mixin` to mix-in the functionalities into other classes.

## Models

### Promisable.Model

```js
// Asumes that the module was added in App.Entities
var person = new App.Entities.Promisable.Model({id: 5});

person.fetch();
person.done(function() {
  // Use your complete model here
});
```

### Pomisable.Model.Static
```js
// Asumes that the module was added in App.Entities
var person = new App.Entities.Promisable.Model.Static({id: 5, name: 'jane'});

person.done(function() {
  //Use your complete model here
});
```

## Collections

### Promisable.Collection

```js
// Asumes that the module was added in App.Entities
var todos = new App.Entities.Promisable.Collection();

todos.fetch();
todos.done(function() {
  // Use your complete collection here
});
```
### Promisable.Collection.Static

```js
// Asumes that the module was added in App.Entities
var todos = new App.Entities.Promisable.Collection.Static([
  {id: 25, description: 'do the laundry'},
  {id: 33, description: 'buy groseries'}
]);

todos.done(function() {
  // Use your complete collection here
});
```

## Mixin

```js
var MyAwesomeModel = Backbone.Model.extend({
  constructor: function() {
    Backbone.Model.apply(this, arguments);
    // Asumes that the module was added in App.Entities
    App.Entities.Promisable.Mixin.apply(this);
  }
});
```

# Licence

Promisable Modules is distributed under [MIT license](http://mutedsolutions.mit-license.org/).
