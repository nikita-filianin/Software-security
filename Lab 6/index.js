const axios = require('axios');
const express = require('express');

const app = express();

const port = 3000;
const CLIENT_ID = '';

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

app.get('/', (req, res) => {
    res.redirect(
        'https://dev-lx288wyj7b3ybbcr.us.auth0.com/authorize?client_id=Ft75xpLvH9wfRfOIbcOT03UfzaL28RIE&redirect_uri=http://localhost:3000/callback&response_type=code&response_mode=query',
    );
});

app.get('/logout', (req, res) => {
    res.redirect(
        'https://dev-lx288wyj7b3ybbcr.us.auth0.com/v2/logout?returnTo=http://localhost:3000&client_id=Ft75xpLvH9wfRfOIbcOT03UfzaL28RIE',
    );
});

app.get('/callback', (req, res) => {
    console.log(req.query);

    const { code } = req.query;
    console.log(code);
    if (!code) {
        res.json({ message: 'You are not authorized!' });
        return;
    }

    const authorizationCodeData = {
        method: 'post',
        url: `https://dev-lx288wyj7b3ybbcr.us.auth0.com/oauth/token`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: {
            grant_type: 'authorization_code',
            audience: 'https://dev-lx288wyj7b3ybbcr.us.auth0.com/api/v2/',
            client_id: 'Ft75xpLvH9wfRfOIbcOT03UfzaL28RIE',
            client_secret: 'ZbAgOplUESLfwPmTKV6OkxgcLmsK7_k-jn3ny_yuMvrCMWY1c4Xe8acYAMHC-sq7',
            code: code,
            redirect_uri: 'http://localhost:3000/callback',
        },
    };

    axios
        .request(authorizationCodeData)
        .then((response) => {
            console.log('Authorization Code:', response.data);
            res.json({ responseData: response.data, logout: 'http://localhost:3000/logout' });
        })
        .catch((error) => {
            res.json({ message: 'Invalid code!' });
            console.error('Error Authorization Code:', error);
        });
});