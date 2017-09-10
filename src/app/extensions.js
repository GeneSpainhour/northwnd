// if (!Array.prototype.distinct) {
//     Array.prototype.distinct = function(cb) {
//         var filterList = {}
//         if (cb) {
//             var items = cb(this)
//             items.forEach(item => {
//                 if (!filterList[item]) {
//                     filterList[item] = true
//                 }
//             }, this)
//         } else {
//             this.forEach(function(item) {
//                 if (!filterList[item]) {
//                     filterList[item] = true
//                 }
//             }, this);
//         }
//         return Object.keys(filterList)
//     }
// }

// if (!Array.prototype.asMap) {
//     Array.prototype.asMap = function(keyField) {
//         var fldValueMap = {}
//         if (this && this.length > 0) {
//             if (keyField != null) {
//                 this.forEach(function(item) {
//                     var key = item[keyField]
//                     if (key) {
//                         fldValueMap[key] = item
//                     }
//                 })

//             } else {
//                 this.forEach(function(item) {
//                     fldValueMap[item] = null
//                 })
//             }

//         }

//         return fldValueMap
//     }
// }

if (!String.prototype.capitalize) {
    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1)
    }
}

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

if (!Array.prototype.isValid) {
    Array.prototype.isValid = function() {
        var bValid = false
        if (this) {
            bValid = typeof this.length !== 'undefined' && this.length > 0
        }
        return bValid
    }
}