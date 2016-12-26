## Telegraph Node Lib
Api Telegraph Node base on [Telegraph API](http://telegra.ph/api)

## New Version
* Support Promise (Thank you **Николай Костюрин**) 

## Install
```bash
npm install --save telegraph-node
```
## Simple to use
```js
const telegraph = require('telegraph-node')
const ph = new telegraph()
```
## Method
- [createAccount](#createaccount)
- [editAccountInfo](#editaccountinfo)
- [getAccountInfo](#getaccountinfo)
- [revokeAccessToken](#revokeaccesstoken)
- [createPage](#createpage)
- [editPage](#editpage)
- [getPage](#getpage)
- [getPageList](#getpagelist)
- [getViews](#getviews)


## createAccount

```js
ph.createAccount('hi', {short_name: 'Sandbox', author_name: 'Fonov Sergei'}).then((result) => {
 console.log(result)
})
```

## editAccountInfo

```js
 ph.editAccountInfo('8ed37a4c957e027ecd0da58c3a53f8ae59cd23099e1bc72e664d8ad083b6', {
     short_name: 'Sandbox', 
     author_name: 'Fonov Sergei'
 }).then((result) => {
    console.log(result)
   })
```

## getAccountInfo

```js
ph.getAccountInfo(token, {}).then((result) => {
 console.log(result)
})
```

## revokeAccessToken

```js
ph.revokeAccessToken(token).then((result) => {
  console.log(result)
})
```

## createPage

```js
ph.createPage(token, 'Fonov Sergei', [{tag: 'h1', children: ['Hello world!']}], {
    return_content: true
}).then((result) => {
 console.log(result)
})
```

## editPage

```js
ph.editPage(token, 'Fonov-Sergei-12-23', 'Fonov Sergei', [{tag: 'h3', children: ['Hello world!']}], {
    return_content: true
}).then((result) => {
 console.log(result)
})
```

## getPage

```js
ph.getPage('Fonov-Sergei-12-23', {return_content: true}).then((result) => {
   console.log(result)
})
```

## getPageList

```js
ph.getPageList(token, {}, (result) => {
    console.log(result)
})
```

## getViews

```js
ph.getViews('Fonov-Sergei-12-23', {}).then((result) => {
  console.log(result)
})
```

## License

Copyright (c) 2016 Fonov Sergei

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
