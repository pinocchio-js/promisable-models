# Promisable Models

Models and Collections are a big part of every Backbone/Marionette applications, this Marionette's module allows models and collections to behave as they were jQuery promises, thus eliminating the need to keep track of your xhr object returned from the ajax call.

Example:
```js
// Asumes that the module was added in App.Entities
var person = new App.Entities.Promisable.Model({id: 5});

model.fetch();
$.when(model, function() {
  // do something with your initialized model	
});
```

The module also includes a static version of both models and collection, which will be resolved by default.

Example
```js
// Asumes that the module was added in App.Entities
var person = new App.Entities.Promisable.Model.Static({id: 5, name: 'jhon'});

$.when(model, function() {
  // do something with your initialized model 
});
```

# Installation

Get a copy of the current version of the module using Bower

```
bower install --save promisable-model
```

Add the new component to your build after including Marionette, ex.

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

# Usuage

There are two ways of using this module
1. Using the provided models and collection
2. Using the provided mixin so you can get the same benefits in other places

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
    Backbone.Mode.apply(this, arguments);
    // Asumes that the module was added in App.Entities
    App.Entities.Promisable.Mixin.apply(this);
  }
});
```
