var canvas = document.getElementById("canvas");
var mode = 1;
function onClick(e){
	var rect = e.target.getBoundingClientRect();
  x = e.clientX - rect.left;
  y = e.clientY - rect.top;

  var context = canvas.getContext('2d');
  fetch("test.php",{
    method : 'POST',
    body : JSON.stringify({
      'id' : 0,
      'op' : 0,
      'data' : []
    })
  }).then(response =>{
    return response.json();
  }).then(jsonData =>{
    context.fillText(jsonData,x,y);
  });
}
canvas.addEventListener('click',onClick,false);
