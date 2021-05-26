const express = require('express')
const serverless = require('serverless-http')
const bodyParser = require('body-parser')
const l10n = require('jm-ez-l10n');
// const pool = require('./configs/dbConfig')
const Routes = require('./src/routes');

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

l10n.setTranslationsFile('en', './src/language/lang.en.json');
app.use(l10n.enableL10NExpress);

const router = new Routes();
app.use('/api', router.path());

module.exports.handler = serverless(app)