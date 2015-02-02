var beautify   = require('js-beautify').js_beautify,
    fs         = require('fs'),
    handlebars = require('handlebars'),
    nodefn     = require('when/node'),
    when       = require('when'),
    readFile   = nodefn.lift(fs.readFile);


var TEMPLATE_PATH = 'scripts/templates/marionette_module_definition.js.hbs';
var SRC_PATH      = 'src/index.js';

var template = readFile(TEMPLATE_PATH);
var src      = readFile(SRC_PATH);

when.join(template, src)
  .then(function(results){
    var template = results[0].toString(),
        code     = results[1].toString(),
        templateFn, build;

    templateFn = handlebars.compile(template);
    
    build = beautify(templateFn({
      namespace: 'Pinocchio',
      module: 'Promisable',
      src: code
    }), {
      indent_size: 2,
      indent_char: " "
    });

    process.stdout.write(build);
  });
