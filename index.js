var attach = require('rtc-attach');
var _cached = {};
var extend = require('cog/extend');
var kgo = require('kgo');
var canplay = require('canplay');

/**
  # snapstream

  A small module for taking a stream and returning a base64 encoded string of the
  stream at the time.

  ## Example Usage

  <<< examples/simple.js

**/
module.exports = function(stream, opts, callback) {
  if (typeof opts == 'function') {
    callback = opts;
    opts = {};
  }

  kgo({
    stream: stream,
    opts: extend({ muted: true }, opts)
  })
  ('attach', ['stream', 'opts'], attach)
  ('renderable', ['attach'], canplay)
  ('capture', ['renderable'], function(video) {
    var canvas = getCachedCanvas(video);
    var context = canvas.getContext('2d');

    context.drawImage(video, 0, 0);
    callback(null, canvas.toDataURL('image/jpeg'));
  })
  .on('error', callback);
};

function getCachedCanvas(video) {
  var key = video.videoWidth + '|' + video.videoHeight;
  var canvas = _cached[key];

  if (! canvas) {
    canvas = _cached[key] = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
  }

  return canvas;
}
