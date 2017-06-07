'use strict';

exports.getSpinResponse = function(req, res) {

  if (req.body && req.body.slotNumber && req.body.slotItems) {
    var splinObj = buildSpinResponse(req.body);
    res.json(splinObj);
  } else {
    var err = {
      responseCode: 300,
      responseMessage: 'Request body error'
    };
    res.json(err);
  }
};

var buildSpinResponse = function(req) {
  var selectedSlots = processSpinRequest(req.slotNumber, req.slotItems);
  var splinObj = {
      responseCode: 200,
      responseObject: {
        isBonus: getWinConf(selectedSlots).winBonus,
        slotArray:selectedSlots,
        winMessage: getWinConf(selectedSlots).winMessage
      }
    };

  return splinObj;
};

var getWinConf = function(selectedSlots) {
  var winConf = {winBonus: false, winMessage:'No Win!'};
  if (selectedSlots.length > 0) {
    var offsetNumber = selectedSlots[0];
    var matchCounter = 0;
    for (var i = 0; selectedSlots.length > i; i++) {
      if (selectedSlots[i] === offsetNumber && i > 0) {
        matchCounter++;
        if (matchCounter == selectedSlots.length-1) {
          winConf.winMessage = 'Big Win!';
        } else if (matchCounter >= Math.floor(selectedSlots.length/2)) {
          winConf.winMessage = 'Small Win!';
          winConf.winBonus = true;
        }
      } else if (selectedSlots[i] !== offsetNumber && i > 0) {
        break;
      }
    };
  }

  return winConf;
}

var processSpinRequest = function(slotNumber, slotItems) {
  var selectedSlotArray = [];
  for (var i = 0;slotNumber > i; i++) {
    var randomIndex = Math.floor(Math.random()*slotItems.length);
    selectedSlotArray[i] = slotItems[randomIndex];
  };

  return selectedSlotArray;
};
