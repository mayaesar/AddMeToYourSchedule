const {OAuth2Client} = require('google-auth-library');
const http = require('http');
const url = require('url');
const open = require('open');
const destroyer = require('server-destroy');

const keys = require('../oauth2.keys.json');
const { resolve } = require('path');
const { rejects } = require('assert');

//pre authenticated oAuth2 client
const preClient = async () => {
    const oAuth2Client = await getAuthenticatedClient();
    const url = 'https://people.googleapis.com/v1/people/me?personFields=names';
    const res = await oAuth2Client.request({url});
    console.log(res.data);

    const tokenInfo = await oAuth2Client.getTokenInfo(
        oAuth2Client.credentials.access_token
    );
    console.log(tokenInfo);
}

//Create a new OAuth2 client
const getAuthenticatedClient = () => {
    return new Promise ((resolve, reject) => {
        const oAuth2Client = new OAuth2Client(
            keys.web.client_id,
            keys.web.client_secret,
            keys.web.redirect_uris[0]
        );
        const authorizeUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: [
                'https://www.googleapis.com/auth/userinfo.profile',
                'https://www.googleapis.com/auth/userinfo.email'
        ].join(" "),
        });
        const server = http.createServer(async (req, res) => {
            try {
                if (req.url.indexOf('/oauth2callback') > -1) {
                    const qs = new url.URL(req.url, 'http://localhost:3000').searchParams;
                    const code = qs.get('code');
                    console.log(`Code is ${code}`);
                    res.end('Authentication successful! Please return to the console.');
                    server.destroy();

                    const r = await oAuth2Client.getToken(code);

                    oAuth2Client.setCredentials(r.tokens);
                    console.info('Tokens acquired.');
                    resolve(oAuth2Client);
                    }
                } 
            catch (err) {
                reject(err);
            }
        })
        .listen(3000, () => {
            // open the browser to the authorize url to start the workflow
            open(authorizeUrl, {wait: false}).then(cp => cp.unref());
        });
        destroyer(server);
    })
}
module.exports = {preClient};
