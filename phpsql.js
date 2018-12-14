function leave(e){
  mouse.isDrawing = false;

  var imageData = context.toDataURL("image/png");
  fetch("test.php", {
    method: 'POST',
    body: JSON.stringify({
      'id': 0,
      'op': 0,
      'data': imageData
    })
  }).then(response => {
    return response.json();
  }).then(jsonData => {
    context.fillText(jsonData, x, y);
  });
}

window.onload = function() {
  var canvas = document.getElementById('canvas');
  if (!canvas || !canvas.getContext) {
    return false;
  }
  var ctx = canvas.getContext('2d');

  //マウスの座標を取得
  var mouse = {
    startX: 0,
    startY: 0,
    x: 0,
    y: 0,
    color: "black",
    isDrawing: false
  };
  var borderWidth = 1;

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

  canvas.addEventListener('mouseleave', function(e) {
    mouse.isDrawing = false;
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
