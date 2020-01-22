var helper = require('node-red-node-test-helper')
var samsung = require('../lib/samsung')

describe('Samsung-tv Node', function () {
  afterEach(function () {
    helper.unload()
  })

  it.each`
    type
      ${'samsung-tv-send'}
      ${'samsung-tv-sendchannel'}
      ${'samsung-tv-isalive'}
      ${'samsung-tv-isaliveping'}
      ${'samsung-tv-token'}
      ${'samsung-tv-turnon'}
      ${'samsung-tv-openapp'}
      ${'samsung-tv-getapps'}
  `('should be loaded $type', function({ type }, done) {
    var flow = [{ id: 'n1', type, name: 'test name' }]
    helper.load(samsung, flow, function() {
      var n1 = helper.getNode('n1')
      expect(n1).toHaveProperty('name', 'test name')
      done()
    })
  })
})
