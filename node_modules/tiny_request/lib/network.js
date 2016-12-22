'use strict'

var fs = require('fs')
var url = require('url')
var http = require('http')
var https = require('https')

class Network {
    constructor() {
        this._protocols = {
            http: http,
            https: https
        }
    }

    _request(options, callback) {
        var self = this

        callback = callback || Function()

        var _url = url.parse(options.url ? options.url : options)
        var protocol = _url.protocol.substr(0, _url.protocol.length - 1)
        var port
        if (_url.protocol == 'http:') {
            port = 80
        }
        if (_url.protocol == 'https:') {
            port = 443
        }
        if (options.port) {
            port = options.port
        }
        if (_url.host == null) {
            callback(undefined, undefined, new Error())
            return
        }
        if (typeof options == 'string') {
            var req_options = {
                host: _url.host,
                path: _url.pathname,
                port: port,
                method: options.method
            }
        } else {
            var queryStr = _url.query ? (_url.query + '&') : ''
            if (options.query !== undefined) {
                queryStr += self._renderUrlencoded(options.query)
            }
            req_options = {
                host: _url.host,
                path: _url.pathname + (queryStr ? '?' + queryStr : ''),
                port: port,
                method: options.method,
                headers: options.headers
            }
        }
        var req = this._protocols[protocol].request(req_options, (response) => {
            if (options.pipe !== undefined) {
                response.pipe(options.pipe)
            }

            var chunks = []
            response.on('data', (chunk) => {
                chunks.push(chunk)
            })
            response.on('end', () => {
                var data = Buffer.concat(chunks).toString('utf-8')
                if (options.json !== undefined && options.json == true) {
                    try {
                        var obj = JSON.parse(data)
                    } catch (e) {
                        callback(data, undefined, e)
                        return
                    }
                    callback(obj, response)
                    return
                } else {
                    callback(data, response)
                }
            })

        })
        if (req_options.method == 'POST' && options.multipart) {
            var data = options.multipart
            var names = Object.keys(options.multipart)
            var boundaryKey = Math.random().toString(16)
            var body = this._renderMultipartBody(names, data, boundaryKey)
            var length = 0

            req.setHeader('Content-Type', 'multipart/form-data; boundary="' + boundaryKey + '"')

            body.forEach((part) => {
                length = length + Buffer.byteLength(part)
            })
            names.forEach((name) => {
                if (data[name].value !== undefined) {
                    length = length + self._getFilesizeInBytes(data[name].value.path)
                }
            })
            req.setHeader('Content-Length', length + (16 * (names.length - 1)) + 8 + Buffer.byteLength(boundaryKey))

            this._sendMultipartParts(boundaryKey, body, data, names, req, 0)
        } else if (req_options.method == 'POST' && options.jsonData) {
            req.setHeader('Content-Type', 'application/json')
            var body = JSON.stringify(options.jsonData)
            req.setHeader('Content-Length', Buffer.byteLength(body))
            req.end(body)
        } else {
            if (req_options.method == 'POST' && options.form) {
                req.setHeader('Content-Type', 'application/x-www-form-urlencoded')
                var body = self._renderUrlencoded(options.form)
                req.setHeader('Content-Length', Buffer.byteLength(body))
                req.end(body)
            } else {
                req.setHeader('Content-Length', 0)
                req.end()
            }
        }
        req.on('error', (e) => {
            callback(undefined, undefined, e)
        })
    }

    _renderMultipartBody(names, data, boundaryKey) {
        var body = []
        names.forEach((name, i) => {
            if (data[name].value !== undefined) {
                body[i] = '--' + boundaryKey + '\r\n' + 'Content-Type: ' + data[name].contentType + '\r\n' + 'Content-Disposition: form-data; name="' + name + '"; filename="' + data[name].filename + '"\r\n' + 'Content-Transfer-Encoding: binary\r\n\r\n'
            } else {
                body[i] = '--' + boundaryKey + '\r\n' + 'Content-Disposition: form-data; name="' + name + '"\r\n\r\n' + data[name]

            }
        })
        return body
    }

    _sendMultipartParts(boundaryKey, body, data, names, req, i) {
        var self = this

        req.write('\r\n' + body[i])

        if (data[names[i]].value !== undefined) {
            data[names[i]].value
                .on('end', () => {
                    if (i + 1 <= names.length - 1) {
                        req.write('\r\n--' + boundaryKey)
                        self._sendMultipartParts(boundaryKey, body, data, names, req, i + 1)
                    } else {
                        req.end('\r\n--' + boundaryKey + '--')
                    }
                })
                .pipe(req, {
                    end: false
                })
        } else {
            if (i + 1 <= names.length - 1) {
                req.write('\r\n--' + boundaryKey)
                self._sendMultipartParts(boundaryKey, body, data, names, req, i + 1)
            } else {
                req.end('\r\n--' + boundaryKey + '--')
            }
        }
    }

    _getFilesizeInBytes(filename) {
        return fs.statSync(filename).size
    }

    /**
     * @param {object} query
     * @returns {string}
     * @private
     */
    _renderUrlencoded(query) {
        let queryStr = ''
        for (const key in query) {
            if (queryStr != '')
                queryStr += '&'

            queryStr += key + '=' + encodeURIComponent(query[key])
        }

        return queryStr
    }

    get(options, callback) {
        if (typeof options == 'string') {
            this._request({url: options, method: 'GET'}, callback)
            return
        }

        options.method = 'GET'
        this._request(options, callback)
    }

    post(options, callback) {
        if (typeof options == 'string') {
            this._request({url: options, method: 'POST'}, callback)
            return
        }

        options.method = 'POST'
        this._request(options, callback)
    }
}

module.exports = new Network()
