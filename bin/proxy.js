#!/usr/bin/env node

var proxy = require('../lib/index.js');
var commandLineArgs = require('command-line-args');

var optionDefinitions = [
    {name: 'port', alias: 'p', type: Number, defaultValue: 44357},
    {name: 'cms', type: String, defaultValue: 'http://172.1.1.1'},
    {name: 'api', type: String, defaultValue: 'https://example.com'},
    {name: 'domain', type: String, defaultValue: ''},
    {name: 'cors', type: Boolean, defaultValue: false}

];


try {
    var options = commandLineArgs(optionDefinitions);
    proxy.startProxy(options.port, options.cms, options.api,options.domain, options.cors);
} catch (error) {
    console.error(error);
}
