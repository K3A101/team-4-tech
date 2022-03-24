'use strict';

/**
 * feature service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::feature.feature');
