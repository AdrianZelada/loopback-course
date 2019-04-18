'use strict';
const utils = require('../libs/utils');

module.exports = function(Difficulty) {
  Difficulty.userAvailable = function(id, cb) {
    Difficulty.findById(id, function(err, difficulty) {
      if (err) {
        utils.sendError(cb, 'erro');
      } else {
        if (difficulty) {
          Difficulty.app.models['personnel'].levelMajor(difficulty.level, cb);
        } else {
          utils.sendError(cb, 'No existe tipo de tarea');
        }
      }
    });
  };

  Difficulty.remoteMethod('userAvailable', {
    accepts: [{
      arg: 'id',
      type: 'number',
      required: true,
    }],
    description: 'Verifica si el usuario es viable',
    http: {
      verb: 'post',
    },
    returns: {
      arg: 'data',
      type: 'array',
      root: true,
    }
  });
};
