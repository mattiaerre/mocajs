const debug = require('debug')('mocajs:routes/index');
const express = require('express');
const Client = require('oc-client');

const client = new Client({
  registries: { serverRendering: process.env.OC_REGISTRY_BASE_URL }
});

const throwMissingName = () => {
  throw new Error("the OpenComponents component's name is missing");
};

const components = [
  {
    name: process.env.OC_COMPONENT_NAME || throwMissingName(),
    version: process.env.OC_COMPONENT_VERSION || '',
    parameters: JSON.parse(process.env.OC_COMPONENT_PARAMETERS || '{}')
  }
];

const router = express.Router();

router.get('/', (req, res) => {
  client.renderComponents(
    components,
    {
      container: false,
      headers: {
        'Accept-Language': 'en-US'
      },
      timeout: 3.0
    },
    (errors, htmls) => {
      if (errors) {
        debug('errors:', errors);
      }
      debug('htmls[0]:', htmls[0]);
      res.render('index', {
        title: process.env.OC_COMPONENT_NAME,
        component: htmls[0]
      });
    }
  );
});

module.exports = router;
