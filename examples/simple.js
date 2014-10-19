var snapstream = require('..');
var getUserMedia = require('getusermedia');
var kgo = require('kgo');

kgo({
  constraints: { video: true, audio: true }
})
('capture', ['constraints'], getUserMedia)
('snap', ['capture'], snapstream)
('processImage', ['snap'], function(imageData) {
  console.log('got image data: ', imageData, imageData.length);
})
.on('error', console.error.bind(console));
