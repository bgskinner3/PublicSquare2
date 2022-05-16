const default1 = require('../defaultUserPics/default1.png');
const default2 = require('../defaultUserPics/default2.jpeg');
const default3 = require('../defaultUserPics/default3.png');
const default4 = require('../defaultUserPics/default4.png');
const default5 = require('../defaultUserPics/default5.png');


const picArr = [default1, default2, default3, default4, default5];


const pic = picArr[Math.floor(Math.random() * picArr.length)];


module.exports = pic