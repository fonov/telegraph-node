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

    createAccount(short_name, options, cb){
        return this.sendreq(this._method.createAccount, Object.assign({short_name}, options), cb)
    }

    editAccountInfo(access_token, options, cb){
        return this.sendreq(this._method.editAccountInfo, Object.assign({access_token}, options), cb)
    }

    getAccountInfo(access_token, options, cb){
        return this.sendreq(this._method.getAccountInfo, Object.assign({access_token}, options), cb)
    }

    revokeAccessToken(access_token, cb){
        return this.sendreq(this._method.revokeAccessToken, {access_token}, cb)
    }

    createPage(access_token, title, content, options, cb){
        content = JSON.stringify(content)
        return this.sendreq(this._method.createPage, Object.assign({access_token, title, content}, options), cb)
    }

    editPage(access_token, path, title, content, options, cb){
        content = JSON.stringify(content)
        return this.sendreq(this._method.editPage, Object.assign({access_token, path, title, content}, options), cb)
    }

    getPage(path, options, cb){
        return this.sendreq(this._method.getPage, Object.assign({path}, options), cb)
    }

    getPageList(access_token, options, cb){
        return this.sendreq(this._method.getPageList, Object.assign({access_token}, options), cb)
    }

    getViews(path, options, cb){
        return this.sendreq(this._method.getViews, Object.assign({path}, options), cb)
    }
}

module.exports = Telegraph
