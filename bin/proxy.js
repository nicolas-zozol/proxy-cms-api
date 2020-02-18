#!/usr/bin/env node

var proxy = require('../lib/index.js');
var commandLineArgs = require('command-line-args');

var optionDefinitions = [
  {name: 'key', type: String, defaultValue:    'domaindev'},
  {name: 'port', alias: 'p', type: Number, defaultValue: 44357},
  {
        name: 'api',
        type: String,
        defaultValue: 'https://example.com'
    },
  {name: 'cms', type: String, defaultValue:    'http://172.1.1.1'}
  ,
  {name: 'cors', type: Boolean, defaultValue:    false}

];


try {
    var options = commandLineArgs(optionDefinitions);
    proxy.startProxy(options.port, options.cms, options.api, options.cors);
} catch (error) {
    console.error(error);
}
