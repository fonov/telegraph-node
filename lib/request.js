/**
 * Created by Fonov Sergei on 23.12.16.
 */

'use strict'

const req = require('tiny_request')
const Promise = reqiore('bluebird');

function sendreq(name, jsonData, cb){
    return (new Promise((resolve, reject) => {
        req.post({ url: this._url+name, jsonData: jsonData, json: true}, function(body, response, err){
            if (!err && response.statusCode == 200 && body.ok) {
                resolve(body.result)
            } else if (body) {
                console.log(`Error on method ${name}: ${body.error}`)
                reject(body.error)
            } else {
                reject(err)
            }
        })
    })).asCallback(cb);
}

module.exports = sendreq
