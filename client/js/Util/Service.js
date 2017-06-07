'use strict';

class Service {
  constructor() {
    this.xhttp = new XMLHttpRequest();
  }

  static doGet (url) {
    return new Promise(function(resolve, reject) {
      var req = new XMLHttpRequest();
      req.open('GET', url);
      req.onload = function() {
        if (req.status == 200) {
          resolve(JSON.parse(req.response));
        } else {
          reject(Error(req.statusText));
        }
      };
      req.onerror = function() {
        reject(Error("Network Error"));
      };
      req.send();
    });
  }

  static doPost (url, data) {
    return new Promise(function(resolve, reject) {
      var req = new XMLHttpRequest();
      req.open('POST', url);
      req.onload = function() {
        if (req.status == 200) {
          resolve(JSON.parse(req.response));
        } else {
          reject(Error(req.statusText));
        }
      };
      req.onerror = function() {
        reject(Error("Network Error"));
      };
      req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      req.send(JSON.stringify(data));
    });
  }
}
