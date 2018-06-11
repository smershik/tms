var val=' minutes';
function Task(text,time) {
  this.text=text;
  this.time=new Date(time);
  var timeOf=parseInt((Date.now()-this.time)/1000/60);
  while(timeOf>=60){
    if(timeOf>=60*24){
      if(timeOf>=60*24*30){
        timeOf=parseInt((Date.now()-this.time)/1000/60/60/24/30);
        val=' mounths';
        break;
      }
      timeOf=parseInt((Date.now()-this.time)/1000/60/60/24);
      val=' days';
      break;
    }
    timeOf=parseInt((Date.now()-this.time)/1000/60/60);
    val=' hourses';
    break;
  }
  Object.defineProperty(this, 'timeOf',{
    get:function () {
      return timeOf;
    }
  })
}
var pojrat=new Task('Pojrat kakoy-nibud figni','9 June 2018 18:20');
document.write(pojrat.text,'===>>>>', pojrat.time, '<br>');
document.write(pojrat.timeOf, val);