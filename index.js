var attach = require('rtc-attach');
var _cached = {};
var extend = require('cog/extend');
var kgo = require('kgo');
var canplay = require('canplay');
var snapvid = require('snapvid');

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
    callback(null, snapvid(video, opts));
  })
  .on('error', callback);
};
