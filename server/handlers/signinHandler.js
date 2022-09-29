const { getGoogleAuthURL } = require("./createGoogleClient");
const http = require('http');
const url = require('url');
const open = require('open');
const destroyer = require('server-destroy');

const getLogin = async (req, res) => {
    return res.send(getGoogleAuthURL());
}

module.exports={getLogin}