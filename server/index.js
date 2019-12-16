const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const proxy = require('http-proxy-middleware');
const { routes } = require('../reverseproxyconfig.json');
const cors = require('cors');

const app = express();

/* SERVE PRODUCT REVIEWS STATIC FILES -- this needs to serve at this location in order for content to populate & have post route function */
app.use('/reviews', express.static(path.resolve(__dirname, '../../Product-Review/client/dist/')));

/* ROUTE DELEGATION TO EXTERNAL MODULES - refer to reverseproxyconfig.json for detailed routes */
/* moved this above bodyparser for post route to work */
for (route of routes) {
  app.use(route.route,
      proxy({
          target: route.address,
          pathRewrite: (path, req) => {
            // console.log("USING PROXY ROUTER", `path: ${path}`, `route.address: ${route.address}`);
            return path.split('/').slice(2).join('/'); // Could use replace, but take care of the leading '/'
          }
      })
  );
}

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/* STATIC FILE SERVES */
/* static html & css files in THIS proxy server */
app.use(express.static(path.resolve(__dirname, '../common')));

/* module bundle paths */
app.use('/recs', express.static(path.resolve(__dirname, '../../Related-Recently-Viewed-Products/client/public/')));
app.use('/search', express.static(path.resolve(__dirname ,'../../Nav-Search/client/dist/')));
app.use('/productdetail', express.static(path.resolve(__dirname, '../../Product-Description/client/dist/')));

module.exports = app;