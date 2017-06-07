'use strict';

const WebUrlConfig = {
  //QA
  BASE_URL: 'http://localhost:3000/',
  spin: 'slot/spin',
  getUrl(urlName) {
    return WebUrlConfig.BASE_URL + WebUrlConfig[urlName];
  }
};
