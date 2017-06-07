'use strict';
module.exports = function(app) {

var slotSpinController = require('../controllers/slotSpinController');

  // spin slot machine Routes
  app.route('/slot/spin')
    .post(slotSpinController.getSpinResponse);
    //.post(slotSpinController.create_a_task);
};
