'use strict';

module.exports = function(Personnel) {
  Personnel.afterRemote('findById', function(context, data, next) {
    console.log('afterRemote');
    // console.log(context);
    console.log(data);
    data.fullname = `${data.name} ${data.lastName}`;
    next();
  });

  Personnel.beforeRemote('findById', function(context, data, next) {
    console.log('beforeRemote');
    // console.log(context);
    console.log(data);
    next();
  });
  // Personnel.findById()

  Personnel.levelMajor = function(level, cb) {
    // level = level - 1;
    Personnel.find({
      where: {
        level: {
          gte: level,
        },
      },
    }, function(e, data) {
      console.log(e);
      cb(null, data);
    });
  }

  Personnel.remoteMethod('levelMajor', {
    accepts: [{
      arg: 'level',
      type: 'number',
      required: true,
      }],
    description: 'Generar Reporte FichaMedica del PPL',
    http: {
      verb: 'get',
    },
    returns: {
      arg: 'data',
      type: 'array',
      root: true,
    }
  });

  Personnel.observe('loaded', function(ctx, next) {
    console.log('loaded');
    console.log(ctx.query);
    next();
  });

  Personnel.observe('access', function(ctx, next) {
    console.log('access');
    console.log(ctx.query);
    next();
  });
};
