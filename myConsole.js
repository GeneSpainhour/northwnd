'use strict'

const myConsole = Object.create(console, {
    assert: {
        value: function assert(assertion, message, ...args) {
            try {
                console.assert(assertion, message, ...args)
            } catch (err) {
                console.error(err.stack)
            }
        },
        configurable: true,
        enumerable: true,
        writeable: true,

    },

})

module.exports = myConsole