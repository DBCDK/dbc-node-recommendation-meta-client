'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = Recommendations;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _lodash = require('lodash');

/**
 * Method for getting recommendations
 *
 * @param {String} endpoint
 * @param {Array} filters
 * @param {Object} params
 * @returns {Promise}
 */
function getRecommendations(endpoint, params) {
  if (!(0, _lodash.isPlainObject)(params)) {
    return Promise.reject({ statusMessage: 'Parameters should be an objet' });
  }

  if (!(0, _lodash.isArray)(params.filters)) {
    return Promise.reject({ statusMessage: 'filters should be an array. I.e. {filer: []}' });
  }

  var parameters = JSON.stringify({ filters: params.filters, profile: params.profile || [], maxresults: 20 });

  return new Promise(function (resolve, reject) {
    _request2['default'].post({
      url: endpoint,
      body: parameters
    }, function (err, response) {
      if (err) {
        return reject(err);
      }
      if (response.statusCode !== 200) {
        return reject(response);
      }

      return resolve(JSON.parse(response.body));
    });
  });
}

/**
 * Initialises the client and returns the request methods
 *
 * @param {String} endpoint
 * @param {Array} filters
 * @returns {{getRecommendations}}
 * @constructor
 */

function Recommendations(config) {
  if ((0, _lodash.isUndefined)(config)) {
    throw new Error('config is undefined');
  }
  if (!config.endpoint) {
    throw new Error('An endpoint needs to be provided with config');
  }

  return {
    getRecommendations: (0, _lodash.curry)(getRecommendations)(config.endpoint)
  };
}

module.exports = exports['default'];