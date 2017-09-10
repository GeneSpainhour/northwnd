var path = require ('path')
var process = require ('process')

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);

  var ret = path.join.apply(path, [__dirname].concat(args));

  log ("root( " + args + " ) => " + ret);
  return ret;
}

function log (msg){
  process.stderr.write(msg + "\n")
}

var tbl = [
    "", "src", "app", "src/app", "keys", "src/app/keys", "./src", "./src/app", "../"
]

log ("Starting test")

tbl.forEach( function (item){
    root(item)
})


log ("process.cwd(): "+ process.cwd())

if (console){
    console.log ("console logging")
    console.log ("tbl", tbl)
}