const Client = require('oc-client');
const debug = require('debug')('mocajs:index');

require('dotenv').config();

const client = new Client(
  {
    registries: { serverRendering: process.env.OC_REGISTRY_BASE_URL }
  }
);

const components = [
  {
    name: process.env.OC_COMPONENT_NAME || (() => { throw new Error('the OpenComponents component\'s name is missing'); })(),
    version: process.env.OC_COMPONENT_VERSION || 'x.x.x',
    parameters: process.env.OC_COMPONENT_PARAMETERS || {}
  }
];

client.renderComponents(
  components,
  {
    container: false,
    headers: {
      'Accept-Language': 'en-US'
    },
    timeout: 3.0
  }, (errors, htmls) => {
    if (errors) {
      debug('errors:', errors);
    }
    debug('htmls[0]:', htmls[0]);
  });
