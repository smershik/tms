window.onload = function() {
  function Task(text) {
  this.text=text;
  var timeNow=new Date();
  Object.defineProperty(this, 'timeNow',{
    get:function () {
      return timeNow;
    }
  })
  }
  (function() {
    var inp=document.getElementsByClassName('.input1');
    document.querySelector('.input1').addEventListener('keydown', function(enter) {
      if (enter.keyCode === 13) {
        var task=new Task(inp.value);
        var div = document.createElement('div');
        div.className = "newBlock";
        div.innerHTML = task.text/*Выводит undifined*/+'===>>>>' +task.timeNow;
        document.body.appendChild(div);
      }
    });
  })();
  document.querySelector('.del').addEventListener('onclick', function () {
    div.parentNode.removeChild(div);/*Это вообще не работает*/
  });
};
