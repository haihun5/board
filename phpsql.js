var canvas = document.getElementById('canvas');
//if (!canvas || !canvas.getContext) {
//  return false;
//}
var ctx = canvas.getContext('2d');

var mouse = {
  startX: 0,
  startY: 0,
  x: 0,
  y: 0,
  color: "black",
  isDrawing: false
};

function load_pad() {
  img = new Image();
  img.src = `pads/${datas['id']}.png`;
  img.onload = function() {
    ctx.drawImage(img, 0, 0);
  }
}

function save_pad() {
  var imageData = canvas.toDataURL("image/png");
  fetch("test.php", {
    method: 'POST',
    body: JSON.stringify({
      'id': 0,
      'op': 0,
      'data': imageData
    })
  });
}

function leave(e) {
  mouse.isDrawing = false;
  save_pad();
}

window.onload = function() {
  var borderWidth = 1;
  load_pad();

  canvas.addEventListener("mousemove", function(e) {
    //2.マウスが動いたら座標値を取得
    var rect = e.target.getBoundingClientRect();
    mouse.x = e.clientX - rect.left - borderWidth;
    mouse.y = e.clientY - rect.top - borderWidth;
    /*
    pageX[Y], offsetLeft[Top]を使う場合
    mouse.x = e.pageX - canvas.offsetLeft - borderWidth;
    mouse.y = e.pageY - canvas.offsetTop - borderWidth;
    */

    //4.isDrawがtrueのとき描画
    if (mouse.isDrawing) {
      ctx.beginPath();
      ctx.moveTo(mouse.startX, mouse.startY);
      ctx.lineTo(mouse.x, mouse.y);
      ctx.strokeStyle = mouse.color;
      ctx.stroke();
      mouse.startX = mouse.x;
      mouse.startY = mouse.y;
    }
  });

  //5.マウスを押したら、描画OK(myDrawをtrue)
  canvas.addEventListener("mousedown", function(e) {
    mouse.isDrawing = true;
    mouse.startX = mouse.x;
    mouse.startY = mouse.y;
  });

  //6.マウスを上げたら、描画禁止(myDrawをfalse)
  canvas.addEventListener("mouseup", function(e) {
    mouse.isDrawing = false;
  });

  canvas.addEventListener('mouseleave', leave);

  canvas.addEventListener('keydown', function(e) {
    if (e.keyCode == 67) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      save_pad();
    }
  });
}

function onClick(e) {
  var rect = e.target.getBoundingClientRect();
  x = e.clientX - rect.left;
  y = e.clientY - rect.top;

  var context = canvas.getContext('2d');
  context.fillText(datas[mode], x, y + 10);
  fetch("test.php", {
    method: 'POST',
    body: JSON.stringify({
      'id': 0,
      'op': 0,
      'data': []
    })
  }).then(response => {
    return response.json();
  }).then(jsonData => {
    context.fillText(jsonData, x, y);
  });
}
//canvas.addEventListener('click', onClick, false);
