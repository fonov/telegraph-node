/**
 * Created by Fonov Sergei on 22.12.16.
 */

'use strict'

class Telegraph {
    constructor(){
        this._url = 'https://api.telegra.ph/'
        this.sendreq = require('./request')
        this._method = require('./method.json')
    }

    createAccount(short_name, options, callback){
        this.sendreq(this._method.createAccount, Object.assign({short_name}, options), callback)
    }

    editAccountInfo(access_token, options, callback){
        this.sendreq(this._method.editAccountInfo, Object.assign({access_token}, options), callback)
    }

    getAccountInfo(access_token, options, callback){
        this.sendreq(this._method.getAccountInfo, Object.assign({access_token}, options), callback)
    }

    revokeAccessToken(access_token, callback){
        this.sendreq(this._method.revokeAccessToken, {access_token}, callback)
    }

    createPage(access_token, title, content, options, callback){
        content = JSON.stringify(content)
        this.sendreq(this._method.createPage, Object.assign({access_token, title, content}, options), callback)
    }

    editPage(access_token, path, title, content, options, callback){
        content = JSON.stringify(content)
        this.sendreq(this._method.editPage, Object.assign({access_token, path, title, content}, options), callback)
    }

    getPage(path, options, callback){
        this.sendreq(this._method.getPage, Object.assign({path}, options), callback)
    }

    getPageList(access_token, options, callback){
        this.sendreq(this._method.getPageList, Object.assign({access_token}, options), callback)
    }

    getViews(path, options, callback){
        this.sendreq(this._method.getViews, Object.assign({path}, options), callback)
    }
}

module.exports = Telegraph