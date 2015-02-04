var fs            = require('vinyl-fs'),
    handlebars    = require('handlebars'),
    through       = require('through2'),
    streamqueue   = require('streamqueue'),
    moduleBuilder = new streamqueue({objectMode: true});


var registerPartials = through.obj(function(file, enc, cb) {
  var partialName = file.path.replace(file.base, '');

  handlebars.registerPartial(partialName, file.contents.toString());
  cb();
});

var renderTemplate = function(locale) {
  return through.obj(function(file, enc, cb) {
    var template = handlebars.compile(file.contents.toString());

    this.push(template(locale))
    cb();
  });
}


var config = {
  globalNamespace: 'Pinocchio',
  namespace:       'Promisable'
}

var partials = fs.src('src/*.js')
  .pipe(registerPartials)

var templates = fs.src('scripts/**/*.js.hbs')

moduleBuilder
  .queue(partials)
  .queue(templates)
  .done()
  .pipe(renderTemplate(config))
  .pipe(process.stdout)
