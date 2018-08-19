"use strict";
var _canvas;
var _ctx;
var _images = {};
var _loadImages = {
  alpha: 'images/alpha.png',
  katahira: 'images/katahira.png'
};
var _imageCount;
var _textImages = {};

window.addEventListener("load", function() {
  _canvas = document.getElementById("canvas");
  _ctx = canvas.getContext("2d");
  _ctx.fillStyle = "#0000ff";
  _ctx.fillRect(0, 0, 640, 576);
  for (var key in _loadImages) {
    _images[key] = new Image();
    _images[key].src = _loadImages[key];
  }
  _imageCount = 0;
  _checkLoadImageFinished();
  // init();
});

function _checkLoadImageFinished() {
  for (var key in _images) {
    if (_images[key].complete) {
      _imageCount += 1;
    }
  }
  if (_imageCount == Object.keys(_images).length) {
    _createText();
    init();
  } else {
    requestAnimationFrame(_checkLoadImageFinished);
  }
}

function _createText() {
  var texarr = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!?\"#$%&'()-=~^|{}[]`*+><              " +
               "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよわをん が ぱ     " +
               "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨワヲン ガ パ     ".split("");
  var cv2 = document.createElement("canvas");
  cv2.width = 320;
  cv2.height = 640;
  var _textCtx = cv2.getContext("2d");
  _textCtx.clearRect(0, 0, 320, 640);
  for (var k = 0; k < 2; k++) {
    var cv = document.createElement("canvas");
    cv.width = 80;
    cv.height = 80;
    var ctx = cv.getContext("2d");
    ctx.drawImage(_images[["alpha", "katahira"][k]], 0, 0);
    var data = ctx.getImageData(0, 0, 80, 80);
    for (var i = 0; i < 80; i++) {
      for (var j = 0; j < 80; j++) {
        if (data.data[(i * 80 + j) * 4] === 255) {
          _textCtx.fillStyle = "#ffffff";
          _textCtx.fillRect(j * 4, i * 4 + k * 320, 4, 4);
        }
      }
    }
  }
  var cv3 = document.createElement("canvas");
  cv3.width = 32;
  cv3.height = 32;
  var ctx3 = cv3.getContext("2d");
  for (var i = 0; i < textarr.length; i++) {
    ctx3.putImageData(_textCtx.getImageData(i * 32))
    _textImages[textarr[i]] =
  }
  img = new Image();
  img.src = cv2.toDataURL("image/png");
  _checkCreateText();
}

function _checkCreateText() {
  if (img.complete) {
    _ctx.drawImage(img, 0, 0);
  } else {
    requestAnimationFrame(_checkCreateText);
  }
}
