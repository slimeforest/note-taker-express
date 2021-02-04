const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const uuid = require('uuid/v1');

const app =  express();
const PORT = 9005;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

