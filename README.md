node-red-contrib-samsung-tv-control
========================
[![Latest Stable Version](https://img.shields.io/npm/v/node-red-contrib-samsung-tv-control.svg)](https://www.npmjs.com/package/node-red-contrib-samsung-tv-control) [![Downloads total](https://img.shields.io/npm/dt/node-red-contrib-samsung-tv-control.svg)](https://www.npmjs.com/package/node-red-contrib-samsung-tv-control) [![Downloads month](https://img.shields.io/npm/dm/node-red-contrib-samsung-tv-control.svg)](https://www.npmjs.com/package/node-red-contrib-samsung-tv-control) [![License](https://img.shields.io/npm/l/node-red-contrib-samsung-tv-control.svg)](https://www.npmjs.com/package/node-red-contrib-samsung-tv-control) [![Paypal Donate](https://img.shields.io/badge/paypal-donate-blue.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=WUAAG2HH58WE4) [![Patreon](https://img.shields.io/badge/patreon-support-blue.svg)](https://www.patreon.com/toxblh)

[🇷🇺 🐙 Инструкция на русском [sprut.ai]](https://sprut.ai/client/plugins/instruction/2295)

The plugin for <a href="http://nodered.org" target="_new">Node-RED</a> for control your samsung TV!

Now it should work on models produced after 2017. I tested it on my UE43NU7400 TV.

For TVs produced in 2016, you should set "TV 2016 (8001 port)" model in config

Install
-------
Find the plugin in Manage palette -> Install -> `node-red-contrib-samsung-tv-control`

Or

Run command on Node-RED installation directory `npm install node-red-contrib-samsung-tv-control`

Usage
------
- Drag and drop any node

![image](https://user-images.githubusercontent.com/2198153/72253254-0679dd00-35f9-11ea-87a1-8fc130dec58f.png)

- Set IP and Mac address of the TV (You can find it in your Wifi Router, or via [the network status menu, see these steps on samsung support](https://www.samsung.com/au/support/tv-audio-video/connect-tv-to-internet/))

![image](https://user-images.githubusercontent.com/2198153/72253663-f57d9b80-35f9-11ea-839c-8bd9b0169193.png)
![image](https://user-images.githubusercontent.com/2198153/72253230-f8c45780-35f8-11ea-8305-47cba43960a0.png)

- Your TV may show a dialog, requesting permission for remote control. If you confirm this dialog, the TV will send an access token back to NodeRed, and it will be displayed in the debug window. Copy & Paste your token from the debug window into the Samsung TV configuration node.

![image](https://user-images.githubusercontent.com/2198153/72253161-c9154f80-35f8-11ea-8fb5-5d2a113407a0.png)

- Enjoy to use it!

- to power on the tv from network, you may need to follow [these steps from samsung support](https://www.samsung.com/au/support/tv-audio-video/control-your-tv-using-the-smartthings-app/).

Roadmap
------

- [ ] Supporting previous version of Samsung TVs
- [ ] Polishing by guildlines from NodeRED for the node

## Donate and Support

The project was developed with ♥ save you (for sure) a lot of time and help you to increase your productivity so, please consider a [donation](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=WUAAG2HH58WE4) or become a [supporter](https://www.patreon.com/toxblh) and help to become more awesome than ever.

[![Patreon](https://img.shields.io/badge/patreon-support-blue.svg?style=for-the-badge&logo=patreon)](https://www.patreon.com/toxblh)
[![Paypal Donate](https://img.shields.io/badge/paypal-donate-blue.svg?style=for-the-badge&logo=paypal)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=WUAAG2HH58WE4)

You can also fund specific issues via Issuehunt. That can boost the development of a feature you need and make it more attractive for contributors.

[![Issuehunt](https://raw.githubusercontent.com/Toxblh/node-red-contrib-samsung-tv-control/master/issuehunt-button.png)](https://issuehunt.io/r/Toxblh/node-red-contrib-samsung-tv-control)
