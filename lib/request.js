/**
 * Created by Fonov Sergei on 23.12.16.
 */

'use strict'

const req = require('tiny_request')

function sendreq(name, jsonData){
    return new Promise((resolve, reject) => {
        req.post({ url: `${this._url}${name}`, jsonData: jsonData, json: true }, (body, response, err) => {
            if (!err && response.statusCode == 200 && body.ok) {
                resolve(body.result)
            } else {
                console.log(`Error on method ${name}: ${body.error}`)
                reject(body.error)
            }
        });
    });
}

module.exports = sendreq
