const Samsung = require('samsung-tv-control').default
const keysProvider = require('./keys.js').provideKeys
const appsProvider = require('./apps.js').provideApps

function registerNodes(RED) {
  function configNode(config) {
    const apiConfig = {
      name: 'Node-RED',
      token: config.token,
      ip: config.ip,
      port: Number(config.model) || 8002,
      mac: config.mac,
    }

    RED.nodes.createNode(this, config)

    this.remote = new Samsung(apiConfig)
  }

  function isAliveNode(config) {
    RED.nodes.createNode(this, config)

    const node = this

    node.on('input', function (msg) {
      const device = RED.nodes.getNode(config.device)
      device.remote
        .isAvailable()
        .then(() => node.send([msg, null]))
        .catch((e) => node.send([null, msg]))
    })
  }

  function isAlivePingNode(config) {
    RED.nodes.createNode(this, config)

    const node = this

    node.on('input', function (msg) {
      const device = RED.nodes.getNode(config.device)
      device.remote
        .isAvailablePing()
        .then(() => node.send([msg, null]))
        .catch((e) => node.send([null, msg]))
    })
  }

  function sendNode(config) {
    RED.nodes.createNode(this, config)

    this.on('input', function (msg) {
      const device = RED.nodes.getNode(config.device)
      var key = config.key ? config.key : msg.payload

      if (!key) {
        this.error('No key given. Specify either in the config or via msg.payload!')
        return
      }

      const node = this

      device.remote.sendKey(String(key), function (err, res) {
        if (err) {
          node.warn(err)
        } else {
          node.send(msg)
        }
      })
    })
  }

  function sendChannel(config) {
    RED.nodes.createNode(this, config)

    this.on('input', async function (msg) {
      const device = RED.nodes.getNode(config.device)
      var keys = config.keys ? String(config.keys) : String(msg.payload)

      if (!keys) {
        this.error('No keys given. Specify either in the config or via msg.payload!')
        return
      }

      const node = this

      try {
        for (var i = 0; i < keys.length; i++) {
          await device.remote.sendKeyPromise('KEY_' + keys.charAt(i))
          await new Promise((r) => setTimeout(r, 300))
        }
        await new Promise((r) => setTimeout(r, 500))
        await device.remote.sendKeyPromise('KEY_ENTER')

        node.send(msg)
      } catch (error) {
        node.warn(error)
      }
    })
  }

  function getToken(config) {
    RED.nodes.createNode(this, config)

    const node = this

    node.on('input', function (msg) {
      const device = RED.nodes.getNode(config.device)

      device.remote.getToken(function (token) {
        msg.payload = token
        node.send(msg)
      })
    })
  }

  function turnOn(config) {
    RED.nodes.createNode(this, config)

    const node = this

    node.on('input', function (msg) {
      const device = RED.nodes.getNode(config.device)

      device.remote.turnOn(function () {
        node.send(msg)
      })
    })
  }

  function openApp(config) {
    RED.nodes.createNode(this, config)

    this.on('input', function (msg) {
      const device = RED.nodes.getNode(config.device)
      var appId = config.appid ? config.appid : msg.payload

      if (!appId) {
        this.error('No appId given. Specify either in the config or via msg.payload!')
        return
      }

      const node = this

      device.remote.openApp(String(appId), function (err, res) {
        if (err) {
          node.warn(err)
        } else {
          node.send(msg)
        }
      })
    })
  }

  function getApps(config) {
    RED.nodes.createNode(this, config)

    const node = this

    node.on('input', function (msg) {
      const device = RED.nodes.getNode(config.device)

      device.remote.getAppsFromTV(function (err, res) {
        if (err || !res.data || res.data.data === undefined) {
          node.warn(err)
        } else {
          const apps = res.data.data
          msg.payload = apps
          node.send(msg)
        }        
      })
    })
  }

  RED.nodes.registerType('samsung-tv', configNode)
  RED.nodes.registerType('samsung-tv-send', sendNode)
  RED.nodes.registerType('samsung-tv-sendchannel', sendChannel)
  RED.nodes.registerType('samsung-tv-isalive', isAliveNode)
  RED.nodes.registerType('samsung-tv-isaliveping', isAlivePingNode)
  RED.nodes.registerType('samsung-tv-token', getToken)
  RED.nodes.registerType('samsung-tv-turnon', turnOn)
  RED.nodes.registerType('samsung-tv-openapp', openApp)
  RED.nodes.registerType('samsung-tv-getapps', getApps)

  keysProvider(RED)
  appsProvider(RED)
}

module.exports = registerNodes
