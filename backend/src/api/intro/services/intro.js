'use strict';

/**
 * intro service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::intro.intro');
