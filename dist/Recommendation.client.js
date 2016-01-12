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
  if (!(0, _lodash.isPlainObject)(params) || (0, _lodash.isUndefined)(params.likes) || (0, _lodash.isUndefined)(params.dislikes)) {
    return Promise.reject({ statusMessage: 'Parameters should be an objet that contains both a like and a dislike parameter. I.e. { like: [], dislike: [] }' });
  }

  if (!(0, _lodash.isArray)(params.likes) || !(0, _lodash.isArray)(params.dislikes)) {
    return Promise.reject({ statusMessage: 'Parameters \'like\' and \'dislike\' should be arrays. I.e. { like: [], dislike: [] }' });
  }

  var parameters = JSON.stringify({ like: params.likes, dislike: params.dislikes, filters: params.filters || [], maxresults: 20 });

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