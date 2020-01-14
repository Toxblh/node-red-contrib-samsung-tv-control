const Samsung = require('samsung-tv-control').default
const keysProvider = require('./keys.js').provideKeys
const appsProvider = require('./apps.js').provideApps

function registerNodes(RED) {
  function configNode(config) {
    const apiConfig = {
      name: 'Node-RED',
      token: config.token,
      ip: config.ip,
      mac: config.mac
    }

    RED.nodes.createNode(this, config)

    this.remote = new Samsung(apiConfig)
  }

  function isAliveNode(config) {
    RED.nodes.createNode(this, config)

    const node = this

    node.on('input', function(msg) {
      const device = RED.nodes.getNode(config.device)
      device.remote
        .isAvaliable()
        .then(() => node.send([msg, null]))
        .catch(e => node.send([null, msg]))
    })
  }

  function sendNode(config) {
    RED.nodes.createNode(this, config)

    this.on('input', function(msg) {
      const device = RED.nodes.getNode(config.device)
      var key = config.key ? config.key : msg.payload

      if (!key) {
        this.error('No key given. Specify either in the config or via msg.payload!')
        return
      }

      const node = this

      device.remote
        .then(() =>
          device.remote.sendKey(String(key), function(err, res) {
            if (err) {
              node.warn(err)
            } else {
              node.send(msg)
            }
          })
        )
        .catch(err => {
          node.warn(err)
        })
    })
  }

  function getToken(config) {
    RED.nodes.createNode(this, config)

    const node = this

    node.on('input', function(msg) {
      const device = RED.nodes.getNode(config.device)
      device.remote
        .then(() =>
          device.remote.getToken(function(token) {
            msg.payload = token
            node.send(msg)
          })
        )
        .catch(err => {
          node.warn(err)
        })
    })
  }

  function turnOn(config) {
    RED.nodes.createNode(this, config)

    const node = this

    node.on('input', function(msg) {
      const device = RED.nodes.getNode(config.device)
      device.remote
        .then(() =>
          device.remote.turnOn(function() {
            node.send(msg)
          })
        )
        .catch(err => {
          node.warn(err)
        })
    })
  }

  function openApp(config) {
    RED.nodes.createNode(this, config)

    this.on('input', function(msg) {
      const device = RED.nodes.getNode(config.device)
      var appId = config.appId ? config.appId : msg.payload

      if (!appId) {
        this.error('No appId given. Specify either in the config or via msg.payload!')
        return
      }

      const node = this

      device.remote
        .then(() =>
          device.remote.openApp(String(appId), function(err, res) {
            if (err) {
              node.warn(err)
            } else {
              node.send(msg)
            }
          })
        )
        .catch(err => {
          node.warn(err)
        })
    })
  }

  function getApps(config) {
    RED.nodes.createNode(this, config)

    const node = this

    node.on('input', function(msg) {
      const device = RED.nodes.getNode(config.device)
      device.remote
        .then(() =>
          device.remote.getAppsFromTV(function (err, res) {
            if (err || res.data.data === undefined) {
              node.warn(err)
            }
            const apps = res.data.data
            msg.payload = apps
            node.send(msg)
          })
        )
        .catch(err => {
          node.warn(err)
        })
    })
  }

  RED.nodes.registerType('samsung-tv', configNode)
  RED.nodes.registerType('samsung-tv-send', sendNode)
  RED.nodes.registerType('samsung-tv-isalive', isAliveNode)
  RED.nodes.registerType('samsung-tv-token', getToken)
  RED.nodes.registerType('samsung-tv-turnon', turnOn)
  RED.nodes.registerType('samsung-tv-openapp', openApp)
  RED.nodes.registerType('samsung-tv-getapps', getApps)

  keysProvider(RED)
  appsProvider(RED)
}

module.exports = registerNodes
