var fs = require('fs');
var express = require('express');
const https = require('https')
var request = require('request');
var cors = require('cors');
var chalk = require('chalk');
var proxy = express();

function applyCors() {
    proxy.use(cors());
    proxy.options('*', cors());
    proxy.all('/*', function (req, res, next) {
        res.header("X-CORS-ADDED", "Cors added manually by Nodejs proxy");
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
}

var startProxy = function (port, cmsUrl, apiUrl, domain = '', cors = false) {

    if (cors) {
        applyCors(proxy);
    }


    // remove trailing slash
    cmsUrl = cmsUrl.replace(/\/$/, '');
    apiUrl = apiUrl.replace(/\/$/, '');

    proxy.use('/', function (req, res) {

        const result = {url: req.url}
        if (shouldProxyToApi(req.url)) {
            result.bcg = true;
            result.proxiedUrl = apiUrl + req.url
            req.pipe(request(apiUrl + req.url)).pipe(res);
        } else {
            result.false = true;
            try {
                //  console.log(chalk.green('Request Proxied -> ' + req.url));
            } catch (e) {
            }
            result.proxiedUrl = cmsUrl + req.url
            req.pipe(request(cmsUrl + req.url)).pipe(res);
        }


    });


    https.createServer({
        key: fs.readFileSync(__dirname + '/' + domain + '.key'),
        cert: fs.readFileSync(__dirname + '/' + domain + '.cert')
    }, proxy).listen(port);

    // Welcome Message
    console.log(chalk.bgBlue.white.bold.underline('\n Proxy Active \n'));
    console.log(chalk.blue('Proxy Cms Url: ' + chalk.green(cmsUrl)));
    console.log(chalk.blue('Proxy Api Url: ' + chalk.green(apiUrl)));
    console.log(chalk.blue('PORT: ' + chalk.green(port) + '\n'));
    console.log(
        chalk.red(
            'To start using the proxy, replace the proxied part of your url with: ' +
            chalk.bold('https://' + domain + ':' + port + '/' + '\n')
        )
    );
};

// Note form author: '/Configuration', '/Auth' are used for my own project. You can remove it safely
const wordsToProxyToApi = ['/api','/Configuration', '/Auth'];

function shouldProxyToApi(url) {
    return wordsToProxyToApi.some(word => url.startsWith(word));
}

exports.startProxy = startProxy;
