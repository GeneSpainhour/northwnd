/*
    Hey, did you know you could write typescript for node.js? All you have to do is:
    1. create and edit your typescript file: fileName.ts
    2. tsc fileName.ts  -> fileName.js
    3. node fileName.js
*/


if (!String.prototype.isJson) {
    String.prototype.isJson = function() {
        var bJson = false

        if (this) {
            try {
                var me = JSON.parse(Object.assign(this))

                bJson = typeof(me) != 'string' || me.length > 0
            } catch (e) {}
        }
        return bJson
    }
}

// this converts an array of objects into a map keyed on
// key name
// A string array will resolve to a map of keys to null
// in which case a key isn't really appropriate, so we'll make it null
if (!Array.prototype.asMap) {
    Array.prototype.asMap = function(keyField) {
        var fldValueMap = {}
        if (this && this.length > 0) {
            if (keyField != null) {
                this.forEach(function(item) {
                    var key = item[keyField]
                    if (key) {
                        fldValueMap[key] = item
                    }
                })

            } else {
                this.forEach(function(item) {
                    fldValueMap[item] = null
                })
            }

        }

        return fldValueMap
    }
}


const obj = { text: "alpha", value: "1" }
const jsonObj = JSON.stringify(obj)

const aString = "a string"

const ten = 10

const emptyString = null

// all this log stuff. 
// NodeJs has a Console class. It provides an interface for various features for 
// writeable streams like stdout and stderr
//  new Console(stdout[,stderr]) <==> class Console ( stdout: WriteableStream, stderr?:WriteableStream)


// We can follow this pattern with a StreamNode class that provides the same features
// to readable and writeable streams. 
//   Writeable:
//      log: writes to stdout stream
//      error : writes to stderr stream, warn is an alias for error
//      assert: throws an Assertion error if condition isn't truthy
//      dir: dir(obj) iterates the obj properties. 
//          console.dir(obj[,options])  <==> 
//              class console.dir( obj: any, options?: {showHidden: boolean, depth: number, colors: boolean})
//      there are more: trace, warn, dir

//console.log(String.isJson.apply(obj) ? "the object is json" : "the object is not json")

// console.log([JSON.stringify(jsonObj), JSON.stringify(jsonObj).isJson()])

// console.log([JSON.stringify(obj), JSON.stringify(obj).isJson()])

// console.log([JSON.stringify(ten), JSON.stringify(ten).isJson()])


// console.log(["It is of my opinion that the people are intending", "It is of my opinion that the people are intending".isJson()])


// console.log(["{\"text\":\"alpha\",\"value\":\"1\"}", "{\"text\":\"alpha\",\"value\":\"1\"}".isJson()])

const console = require('./myConsole')

const name = "bubba"

//console.assert(false, `this is a message, ${name}`)

const lst = ["alpha", "beta", "gamma"]
console.log(["lst.asMap"], lst.asMap(null, function(obj, fld) { return obj.find(v => v == fld) }))

var data = [
    { first: "tom", last: "jones", job: "singer" }, { first: "steve", last: "smith", job: "blacksmith" }, { first: "adam", last: "andrews", job: "plumber" }, { first: "ben", last: "bradley", job: "baker" }, { first: "carl", last: "collen", job: "cook" }, { first: "david", last: "desmond", job: "dentist" }

]

console.log(["data.asMap()"], data.asMap("job"))