const { KEYS } = require('samsung-tv-control/lib/keys')

function provideKeys(RED) {
  RED.httpAdmin.get('/samsungtv/keys', function (req, res, next) {
    res.send(JSON.stringify(KEYS))
    next()
  })
}

module.exports.provideKeys = provideKeys
