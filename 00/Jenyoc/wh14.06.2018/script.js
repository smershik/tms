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
  var out=document.getElementsByClassName('.output');
  var inp=document.getElementsByClassName('.input1');
  document.querySelector('.input1').addEventListener('keydown', function(enter) {
    if (enter.keyCode === 13) {
      var task=new Task(inp.value);
      var div = document.createElement('div');
      div.className = "alert alert-success";
      div.innerHTML = task.text+'===>>>>' +task.timeNow;
      document.body.appendChild(div);
    }
  });
})();
