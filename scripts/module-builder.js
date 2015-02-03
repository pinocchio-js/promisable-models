var beautify   = require('js-beautify').js_beautify,
    fs         = require('fs'),
    handlebars = require('handlebars'),
    nodefn     = require('when/node'),
    when       = require('when'),
    readFile   = nodefn.lift(fs.readFile);


var TEMPLATE_PATH   = 'scripts/templates/marionette_module_definition.js.hbs',
    MIXIN_PATH      = 'src/mixin.js',
    MODEL_PATH      = 'src/model.js',
    COLLECTION_PATH = 'src/collection.js';

var template   = readFile(TEMPLATE_PATH),
    mixin      = readFile(MIXIN_PATH),
    model      = readFile(MODEL_PATH),
    collection = readFile(COLLECTION_PATH);

when.join(template, mixin, model, collection)
  .then(function(results){
    var template   = results[0].toString(),
        mixin      = results[1].toString(),
        model      = results[2].toString(),
        collection = results[3].toString(),
        templateFn, build;

    templateFn = handlebars.compile(template);
    
    build = beautify(templateFn({
      globalNamespace : 'Pinocchio',
      namespace       : 'Promisable',
      mixin           : mixin,
      model           : model,
      collection      : collection
    }), {
      indent_size: 2,
      indent_char: " "
    });

    process.stdout.write(build);
  });
