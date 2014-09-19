var attachstream = require('rtc-core/attachstream');
var _cached = {};

/**
  # snapstream

  A small module for taking a stream and returning a base64 encoded string of the
  stream at the time.

  ## Example Usage

  <<< examples/simple.js

**/
module.exports = function(stream, opts, callback) {
  var video;

  if (typeof opts == 'function') {
    callback = opts;
    opts = {};
  }

  video = (opts || {}).video || createVideoElement();
  attachstream(stream, video, function(err) {
    var canvas;
    var context;

    if (err) {
      return callback(err);
    }

    canvas = getCachedCanvas(video);
    context = canvas.getContext('2d');

    context.drawImage(video, 0, 0);
    callback(null, canvas.toDataURL('image/jpeg'));
  });
};

function createVideoElement() {
  var el = document.createElement('video');

  el.setAttribute('muted', 'muted');
  return el;
}

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
