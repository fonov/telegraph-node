Tiny module for http requests with no dependencies

## Install
npm install tiny_request

## Simple to use


```js
var req = require('tiny_request')

req.get('http://google.com', function(body, response, err){
	if (!err && response.statusCode == 200) {  
		console.log(body) 
	} 
})
```
## Examples

- [JSON](#json)
- [GET](#get)  
- [POST Multipart](#post-multipart)
- [POST Froms](#post-forms)
- [Custom HTTP Headers](#custom-http-headers)
- [Stream](#stream)
 
## JSON

To automatically parse JSON you just need to pass JSON parameter.

Example: 

```js 
req.get({ url: 'http://test.com/json', json: true}, function(body, response, err){
	if (!err && response.statusCode == 200) {  
		console.log(body) //body now is parsed JSON object
	} 
})
```

## GET

```js 
req.get({ url: 'http://test.com', query: { test: 'test' }}, function(body, response, err){
	if (!err && response.statusCode == 200) {  
		console.log(body) 
	} 
})
```
Where query is GET parameters object

Also you can pass port parameter, for example: 

```js 
req.get({ url: 'http://test.com', port: 8080}, function(body, response, err){
	if (!err && response.statusCode == 200) {  
		console.log(body) 
	} 
})
```

## POST Multipart

```js 
var data = {
	image: {
		value: fs.createReadStream('photo.png'), 
		filename: 'photo.png',
		contentType: 'image/png'			
	},
	test: 'test'
}

req.post({
	url: 'http://test.com',
	query: { test: 'test' },
 	multipart: data 
}, function(body, response, err){
	if (!err && response.statusCode == 200) {  
		console.log(body) 
	} 
})
```

## POST Forms

```js 
var form = {
	test: 'test'
}

req.post({ url: 'http://test.com', form: form}, function(body, response, err){
	if (!err && response.statusCode == 200) {  
		console.log(body) 
	} 
})
```

## POST Json

```js 
var data = {
	test: 'test'
}

req.post({ url: 'http://test.com', jsonData: data}, function(body, response, err){
	if (!err && response.statusCode == 200) {  
		console.log(body) 
	} 
})
```

## Custom HTTP Headers

```js 
var headers = {
	'Test-Header': 'test'
}

req.post({ url: 'http://test.com', headers: headers}, function(body, response, err){
	if (!err && response.statusCode == 200) {  
		console.log(body) 
	} 
})
```

## Stream

```js  
req.get({url: url, pipe: stream}) 
```

