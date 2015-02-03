# Promisable Models

This is a module for Marionette's Applications. That allow Backbone's models and collection to behave as it was a jQuery promise.

## Documentation Index

* [Installation](#instalation)
* [Promisable.Mixin](#promisable-mixin)
* [Promisable.Model](#promisable-model)
* [Promisable.Collection](#promisable-collection)
* [Promisable.Model.Static](#promisable-model-static)
* [Promisable.Collection.Static](#promisable-collection-static)

### Installation

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

```javascript
var App = new Marionette.Application();
// Register the module, in this case entities, the name is just an example,
// it can have anything that makes sense inside your application
App.module('Entities', Pinocchio.Promisable);
// Later somewhere in your app
App.start();
```

### Promisable.Mixin

### Promisable.Model

### Promisable.Collection

### Promisable.Model.Static

### Promisable.Collection.Static
