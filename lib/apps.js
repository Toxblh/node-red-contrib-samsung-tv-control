const { APPS } = require('samsung-tv-control/lib/apps')

function provideApps(RED) {
  RED.httpAdmin.get('/samsungtv/apps', function(req, res, next) {
    res.send(JSON.stringify(APPS))
    next()
  })
}

module.exports.provideApps = provideApps
