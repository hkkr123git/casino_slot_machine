'use strict';

class ApiService {
  constructor() {
  }

  static makeSlotSpin(request) {
    request = request || {};
    const url = WebUrlConfig.getUrl('spin');
    return Service.doPost(url, request);
  }
}
