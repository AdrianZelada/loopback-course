
const utils = require('../libs/utils');
module.exports = function(Model, options) {

  Model.validate('assignTo', function(err) {
    const ind = parseInt(this.assignTo);
    if (ind === NaN){
      err();
    } else {
      this.assignTo = ind;
    }
  });

  Model.observe('before save', function(ctx ,next) {
    const data = ctx.instance || ctx.newInstance;

    Model.app.models['personnel'].findById(data.assignTo, (err, res) => {
      if (res) {
        Model.app.models['Difficulty'].findById(data.difficulty, (err, dTask) => {
          if (dTask) {
            if (res.level >= dTask.level) {
              next();
            } else {
              utils.sendError(next, 'Tarea alta para Usuario');
            }
          } else {
            utils.sendError(next, 'No existe el tipo de tarea');
          }
        });
      } else {
        utils.sendError(next, 'No existe el Usuario');
      }
    });
  });
};
