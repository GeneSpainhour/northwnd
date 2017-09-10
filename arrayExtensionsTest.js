if (!Array.prototype.isValid) {
    Array.prototype.isValid = function() {
        var bValid = false
        if (this) {
            bValid = typeof this.length !== 'undefined' && this.length > 0
        }
        return bValid
    }
}

const emptyBuff = []

const contentBuff = [1, 2, 3, 4]

console.log(["emptyBuff", emptyBuff.isValid()])
    //console.log(["undefinedBuff", undefinedBuff.isValid()])
console.log(["contentBuff", contentBuff.isValid()])