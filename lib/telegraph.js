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

    createAccount(short_name, options){
        return this.sendreq(this._method.createAccount, Object.assign({short_name}, options))
    }

    editAccountInfo(access_token, options){
        return this.sendreq(this._method.editAccountInfo, Object.assign({access_token}, options))
    }

    getAccountInfo(access_token, options){
        return this.sendreq(this._method.getAccountInfo, Object.assign({access_token}, options))
    }

    revokeAccessToken(access_token){
        return this.sendreq(this._method.revokeAccessToken, {access_token})
    }

    createPage(access_token, title, content, options){
        content = JSON.stringify(content)
        return this.sendreq(this._method.createPage, Object.assign({access_token, title, content}, options))
    }

    editPage(access_token, path, title, content, options){
        content = JSON.stringify(content)
        return this.sendreq(this._method.editPage, Object.assign({access_token, path, title, content}, options))
    }

    getPage(path, options){
        return this.sendreq(this._method.getPage, Object.assign({path}, options))
    }

    getPageList(access_token, options){
        return this.sendreq(this._method.getPageList, Object.assign({access_token}, options))
    }

    getViews(path, options){
        return this.sendreq(this._method.getViews, Object.assign({path}, options))
    }
}

module.exports = Telegraph