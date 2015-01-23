var snapstream = require('..');
var getUserMedia = require('getusermedia');
var kgo = require('kgo');
var h = require('hyperscript');

kgo({
  constraints: { video: true, audio: false }
})
('capture', ['constraints'], getUserMedia)
('snap', ['capture'], snapstream)
('processImage', ['snap'], function(imageData) {
  console.log('got image data: ', imageData, imageData.length);
  document.body.appendChild(h('img', { src: imageData }));
})
.on('error', console.error.bind(console));
