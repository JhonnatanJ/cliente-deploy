//Install express server
const express = require('express');
const path = require('path');
const enforce = require('express-sslify');

const app = express();
app.use(enforce.HTTPS({ trustProtoHeader: true }));

//Serve only the static files form the dist directory
app.use(express.static('./dist/cliente-libreria'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/cliente-libreria/'}),
);

//Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);