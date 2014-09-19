var _cached = {};

/**
  # capsnap

  A small module for taking a stream and returning a base64 encoded string of the
  stream at the time.

  ## Example Usage

  <<< examples/simple.js

**/
module.exports = function(stream, opts, callback) {
  var video;

  function captureFrame() {
    var canvas = getCachedCanvas(video);
    var context = canvas.getContext('2d');

    video.removeEventListener('canplay', captureFrame);
    video.removeEventListener('loadedmetadata', captureFrame);
    video.play();

    context.drawImage(video, 0, 0);
    callback(null, canvas.toDataURL('image/jpeg'));
  }

  if (typeof opts == 'function') {
    callback = opts;
    opts = {};
  }

  video = (opts || {}).video || createVideoElement();

  // check for srcObject
  if (typeof video.srcObject != 'undefined') {
    video.srcObject = stream;
  }
  // check for mozSrcObject
  else if (typeof video.mozSrcObject != 'undefined') {
    video.mozSrcObject = stream;
  }
  else {
    video.src = URL ? URL.createObjectURL(stream) : stream;
  }

  // if the video is ready now, then capture the frame
  if (video.readyState >= 3) {
    return captureFrame();
  }
  else {
    video.addEventListener('canplay', captureFrame, false);
    video.addEventListener('loadedmetadata', captureFrame, false);
  }
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
