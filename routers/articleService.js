var express = require('express');
var router = express.Router()
const apiAdapter = require('./apiAdapter')
const isAuthorized = require('../controller/requestAuthenticator')
const jwtAuthz = require('express-jwt-authz');
require('dotenv').config();

const BASE_URL = process.env.ARTICLE_BASE_URL;
const api = apiAdapter(BASE_URL)
// more routes for our API will happen here
router.route('/articles')
    // create article (accessed at POST )
    .post(isAuthorized,jwtAuthz(['create:articles']),function(req, res) {
      api.post(req.path, req.body).then(resp => {
        res.json(resp.data)
      })
  })
    .get(function(req, res) {
  api.get(req.path).then(resp => {
    res.json(resp.data)
  })
    });

    // route ended with 
    router.route('/article/:article_id')
    .get(isAuthorized,jwtAuthz(['read:articles']),function(req, res) {
          api.get(req.path).then(resp => {
		  res.send(resp.data)
		})
        
    })
    // update
    .put(isAuthorized,jwtAuthz(['edit:articles']),function(req, res) {

      api.put(req.path, req.body).then(resp => {
        res.json(resp.data)
      })
    })
        // Delete route
    .delete(isAuthorized,jwtAuthz(['delete:articles']),function(req, res) {
      api.delete(req.path, req.params).then(resp => {
        res.json(resp.data)
      })
    });
module.exports = router