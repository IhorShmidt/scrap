const testData = [
  {
    "Id": 28694475,
    "ClusterId": 28694475,
    "NewsId": 52493189,
    "DateCreated": 1486236745,
    "SeoTitle": "Roman_Zozulja_Ja_uzhe_prinjal_svoe_reshenie_no_ozvuchu_ego_v_ponedelnik",
    "HasImage": false,
    "HasVideo": false,
    "TopValue": false,
    "Title": "Роман Зозуля: «Я уже принял свое решение, но озвучу его в понедельник»",
    "PartnerTitle": "Шахта",
    "Url": "http://shahta.org/163472-roman-zozulya-ya-uzhe-prinyal-svoe-reshenie-no-ozvuchu-ego-v-ponedelnik.html",
    "DateLast": 1486236745,
    "NewsCount": 1,
    "Dups": [
      {
        "Id": 52493210,
        "ClusterId": 28694475,
        "NewsId": 52493210,
        "OriginalId": 52493189,
        "DateCreated": 1486236866,
        "Title": "Зозуля вже знає де продовжить кар'єру",
        "PartnerId": 1192,
        "PartnerTitle": "Футбол в Україні",
        "Url": "http://football-ukraine.com/footballtransfer-Ukrainian_abroad/40978zozulya-vzhe-znae-de-prodovzhit-kareru.html",
        "HasImage": false,
        "HasVideo": false,
        "Details": true,
        "Transition": false,
        "NewsCount": 1
      }
    ],
    "Details": true,
    "Transition": false
  },
  {
    "Id": 28694467,
    "ClusterId": 28694467,
    "NewsId": 52493177,
    "DateCreated": 1486236686,
    "SeoTitle": "Guje_ne_povernetsja_v_Ukrajinu",
    "HasImage": false,
    "HasVideo": false,
    "TopValue": false,
    "Title": "Гуйє не повернеться в Україну",
    "PartnerTitle": "Футбольні трансфери",
    "Url": "http://footballtransfer.com.ua/ua-other/news-66728.html",
    "DateLast": 1486236686,
    "NewsCount": 1,
    "Dups": [
      {
        "Id": 52499339,
        "ClusterId": 28694467,
        "NewsId": 52499339,
        "OriginalId": 52493177,
        "DateCreated": 1486288821,
        "Title": "Улюбленець Мирона Маркевича відмовляється від кар\"єри в Україні",
        "PartnerId": 3110,
        "PartnerTitle": "ПлюсСпорт",
        "Url": "http://plussport.com.ua/news/201702/2337-ulyublenec-myrona-markevycha-vidmovlyayetsya-karyery",
        "HasImage": false,
        "HasVideo": false,
        "Details": true,
        "Transition": false,
        "NewsCount": 1
      }
    ],
    "Details": true,
    "Transition": false
  }];
//
// const _ = require('lodash');
// const newsModel = require('../models/news.model');
const init = require('../config/connection');

init.getMongoose();
//
// const topsArray = _.map(testData, top => {
//   return {postId: top.Id, url: top.Url, title: top.Title}
// });
// newsModel.create(topsArray).then(result => {
//   console.log('Everything Ok', result);
// }).catch(err => console.log('OOpps, err', err));
//




var Promise = require('bluebird');
var retry = require('bluebird-retry');
const newsModel = require('../models/news.model');
var count = 0, promiseArr = [];


function myfunc() {
  console.log('myfunc called ' + (++count) + ' times');
  promiseArr.push(newsModel.create({
    postId: count,
    title: count,
    url: count
  }));
  if (count < 1000) {
    return Promise.reject(new Error('fail the first two times'));
  } else {
    return Promise.resolve(promiseArr);
  }
}

retry(myfunc)
    .then(function(result) {
      
      console.log(result);
      console.log('--------------------');
      return Promise.all(result);
    })
    .then(result => {
      console.log('result last');
      console.log(result);
    })
;