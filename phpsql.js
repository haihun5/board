var canvas = document.getElementById("canvas");
var mode = 1;
function onClick(e){
	var rect = e.target.getBoundingClientRect();
  x = e.clientX - rect.left;
  y = e.clientY - rect.top;

  var context = canvas.getContext('2d');
  context.fillText("a",x,y);
  fetch("test.php",{
    method : 'POST',
    headers : {
      'Context-Type' : 'application/json'
    },
    body : JSON.stringify({
      'id' : 0,
      'op' : 0,
      'data' : []
    })
  }).then(response =>{
    context.fillText(response.statusText,x+10,y);
    return response.text();
  }).then(text =>{
    context.fillText(text,x,y+10);
  }).then(jsonData =>{
    context.fillText("c",x+20,y);
    context.fillText(jsonData,x,y);
  });
}
canvas.addEventListener('click',onClick,false);
