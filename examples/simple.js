var capsnap = require('..');
var getUserMedia = require('getusermedia');

getUserMedia({ video: true, audio: true }, function(err, stream) {
  if (err) {
    return console.error('Could not capture stream: ', err);
  }

  capsnap(stream, function(err, imageData) {
    if (err) {
      return console.error(err);
    }

    console.log('got image data: ', imageData);
  });
});
