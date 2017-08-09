const _ = require('lodash'),
  assert = require('assert'),
  fs = require('fs'),
  json = JSON.stringify,
  path = require('path'),
  spawnSync = require('child_process').spawnSync,
  BaresoilClient = require('baresoil-client')
  ;

global.WebSocket = require('ws');

const BS_CLIENT = new BaresoilClient({
  endpoint: 'ws://null.baresoil.io:8086/__bs__/live',
});

let NEXT_RPC_ID = 1;


function choice(inArr) {
  return inArr[Math.floor(Math.random() * inArr.length)];
}


function makeRequest(images) {
  const requestId = ++NEXT_RPC_ID;
  const image = choice(images);
  const startTime = Date.now();

  console.log(json({
    event: 'start_request',
    requestId,
  }));

  BS_CLIENT.run('detect_faces', {
    imageData: image.imageData,
  }, (err, result) => {
    if (err || !result.faces || !result.faces.length) {
      console.log(json({
        event: 'request_fail',
        requestId,
      }));
    } else {
      console.log(json({
        event: 'request_ok',
        requestId,
        data: {
          rttMs: Date.now() - startTime,
          imgBytesPosted: image.size,
          imgBytesReceived: Buffer.from(result.preview, 'base64').length,
          walltimeMs: _.get(result, 'metadata.walltimeMs'),
          bodyRawSize: json(result).length,
          facesFound: _.size(result.faces),
        },
      }));
    }

    _.delay(() => makeRequest(images), Math.floor(Math.random() * 100));
  });
}


function main() {
  // Read sample images.
  const imgDir = path.resolve(__dirname, 'test_images');
  const imageFiles = _.filter(fs.readdirSync(imgDir), imgName => imgName.match(/\.jpg$/i));
  assert(imageFiles.length, 'No sample images found.');
  const images = _.map(imageFiles, (imgFile) => {
    const imgBuffer = fs.readFileSync(path.join(imgDir, imgFile));
    return {
      imageData: imgBuffer.toString('base64'),
      size: imgBuffer.length,
    };
  });

  // Connect to the server.
  BS_CLIENT.connect();
  BS_CLIENT.once('connected', () => makeRequest(images));
}


if (require.main === module) {
  main();
}

