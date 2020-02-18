# Local binary Proxy

Simple proxy to switch from CMS to API services based on url start. You enter in your 
browser the url https://domaindev:44357/api/bookmarks, then it redirect to the api server. If you
enter https://domaindev:44357/other, it goes to the cms (or other system if you don't work on cms application). 

## Getting Started

### Preparation

in `/etc/hosts` add domaindev to localhost alias

127.0.0.1	localhost
127.0.1.1	domaindev



```
node bin/proxy.js --cms http://172.1.1.1  --api https://example.com --key domaindev --port 44357 
```

You should modify these default values in the bin/proxy.js file

It will open a server at port 44357, using domaindev.cert and domaindev.key certificates joined with the repo.
The server will transmit some request to the cms at http://172.1.1.1:8080, and other to the api at  

If port < 1000 is needed, you need sudo : 

```
sudo node bin/proxy.js --cms http://172.1.1.1  --api https://example.com --key domaindev --port 447 
```

## Configuration

You can modify default values of --cms, --api, --key, --port in bin/proxy.js

You can modify which request should go to api by modifying lib/index.js

    const wordsToProxyToApi = ['/Configuration', '/Auth'];
    
    function shouldProxyToApi(url){
      return wordsToProxyToApi.some(word => url.startsWith(word));
    }
 
If it doesn't go to api, it goes to cms


## Default Options

| Option         | Default               | 
| -------------- | --------------------- | 
| --cms          | http://172.1.1.1      | 
| --api          | https://example.com   |
| --port         | 44357                 |
| --key          | domaindev             |

## Create another key

It's very simple to create another key and certificate if needed

    openssl req -nodes -new -x509 -keyout server.key -out server.cert
    
Enter values by default, except for `Common Name (FQDN)`: Enter the domain name you wish.