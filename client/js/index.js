'use strict';

class SlotMachine {

  constructor (args) {
    this.start = args;
    this.reelBannersIds = [];
    this.intervalRef = null;
  }

  init () {
    const startBtns = document.getElementsByClassName(this.start);
    for (let i = 0; i<startBtns.length; i++) {
      startBtns[i].addEventListener('click', function () {
        this.playSlots();
      }.bind(this), false);
    }
    this.clearMessages();
  }

  clearMessages () {
    document.getElementById('countDownNotification').innerHTML = '';
    document.getElementById('Result').innerHTML = '';
    document.getElementById('spinWrapper').style.display = 'none';
    document.getElementById('spinCount').innerHTML = '';
  }

  getSpinRequest () {
    const spinRequest = {};
    spinRequest.slotNumber = 3;
    spinRequest.slotItems = [0, 1, 2, 3, 4, 5];

    return spinRequest;
  }

  playSlots () {
    const context = this;
    this.clearMessages();
    this.intervalRef = setInterval(function () {
      context.setReels('slot1_image', 100, 0);
      context.setReels('slot2_image', 100, 100);
      context.setReels('slot3_image', 100, 200);
    }, 300);
    setTimeout(function () {
      const spinRequest = context.getSpinRequest();
      ApiService.makeSlotSpin(spinRequest).then(function(response) {
        context.processSpinResponse(response);
      }, function(error) {
        alert('We are facing some technical issues. Please try again later!');
      });
    }, 1500);
  }

  processSpinResponse (response) {
    const context = this;
    setTimeout(function () {
      const slot1ImageHolder = document.getElementById('slot1_image');
      const slot2ImageHolder = document.getElementById('slot2_image');
      const slot3ImageHolder = document.getElementById('slot3_image');
      const resultContainer = document.getElementById('Result');
      slot1ImageHolder.src = 'images/Symbol_' + response.responseObject.slotArray[0] + '.png';
      slot2ImageHolder.src = 'images/Symbol_' + response.responseObject.slotArray[1] + '.png';
      slot3ImageHolder.src = 'images/Symbol_' + response.responseObject.slotArray[2] + '.png';
      resultContainer.innerHTML = response.responseObject.winMessage;

      if (response.responseObject.isBonus) {
        context.initBonusSpin();
      }
    }, 700);
    context.stopReels();
  }

  initBonusSpin () {
    let counterValue = 5;
    const context = this;
    document.getElementById('countDownNotification').innerHTML =
      'Hurray! you have won a BONUS Spin!';
    document.getElementById('spinWrapper').style.display = 'block';
    const spinWaitInterval = setInterval(function () {
      document.getElementById('spinCount').innerHTML = counterValue;
      counterValue--;
      if (counterValue < 0) {
        clearInterval(spinWaitInterval);
        document.getElementById('spinCount').innerHTML = '';
        context.playSlots();
      }
    }, 1000);
  }

  setReels (elementId, speed, delay) {
    setTimeout(function () {
      const slot1ImageHolder = document.getElementById(elementId);
      this.reelBannersIds = ['Symbol_0.png', 'Symbol_1.png', 'Symbol_2.png', 'Symbol_3.png', 'Symbol_4.png', 'Symbol_5.png'];
      for(let j = 0; j<this.reelBannersIds.length;j++) {
        setTimeout(function(y) {
          return function() {
             slot1ImageHolder.src = 'images/Symbol_' + j + '.png';
          };
          if (j == this.reelBannersIds.length) {
            j = 0;
          }
        }(j), speed*j);
      }
    }, delay);
  }

  stopReels () {
    clearInterval(this.intervalRef);
  }
}
