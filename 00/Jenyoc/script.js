(function () {
  var newsId, sources, block,
    url = 'https://newsapi.org/v2/sources?apiKey=3e04d75c3df0462c91e62abf7c794fb2&language=ru',

    input=  document.querySelector('.inp'),
    newsBlock= document.querySelector('.newsBlock'),
    container = document.querySelector('.news'),
    hide=document.querySelector('.hide'),

    xhr= new XMLHttpRequest();

  xhr.open('GET',url);
  xhr.send();

  xhr.onreadystatechange=function(){
    if(xhr.readyState!==4) return;
    sources=JSON.parse(xhr.response).sources;
    render();
  };

  function hideNews(event){
    newsBlock.innerText='';
  }

  function getGn(event) {
    hideNews();
    newsId='google-news-ru';
    getNews();
  }

  function getLenta(event) {
    hideNews();
    newsId='lenta';
    getNews();
  }

  function getRbc(event) {
    hideNews();
    newsId='rbc';
    getNews();
  }

  function getRt(event) {
    hideNews();
    newsId='rt';
    getNews();
  }

  function getNews() {
    var urlNews = 'https://newsapi.org/v2/top-headlines?apiKey=3e04d75c3df0462c91e62abf7c794fb2&sources='+newsId,
      newsXhr=new XMLHttpRequest();

    newsXhr.open('GET',urlNews);
    newsXhr.send();

    newsXhr.onreadystatechange=function(){
      if(newsXhr.readyState!==4) return;
      news=JSON.parse(newsXhr.response).articles;
      console.log(news);

      news.forEach(function (item) {
        block=createElement('section', {
        });
        block.innerHTML='<a href="' + item.url + '">'+
          '<h1>'+item.title+'</h1>'+
          '</a>'+
          '<p>'+item.description+'</p>'+'<br>';
        newsBlock.appendChild(block);
      });
    };
  }

  function createElement(elemName, options, attributes){
    attributes = attributes || {};
    var elem = document.createElement(elemName);
    Object.assign(elem, options);
    Object.keys(attributes).forEach(function(key){
      elem.setAttribute(key, attributes[key]);
    });
    return elem;
  }
  function render(){
    var gnID = createElement('button', {innerText: sources[0].id, className:'gn'}),
      lentaID = createElement('button', {innerText: sources[1].id, className:'lenta'}),
      rbcID = createElement('button', {innerText: sources[2].id, className:'rbc'}),
      rtID = createElement('button', {innerText: sources[3].id, className:'rt'}),
      box = createElement('DIV');
    box.innerHTML = getElemsHtml([gnID,lentaID,rbcID,rtID]);
    container.appendChild(box);
    var gn=document.querySelector('.gn'),
      lenta=document.querySelector('.lenta'),
      rbc=document.querySelector('.rbc'),
      rt=document.querySelector('.rt');

    gn.addEventListener('click', getGn);
    lenta.addEventListener('click', getLenta);
    rbc.addEventListener('click', getRbc);
    rt.addEventListener('click', getRt);
  }
  function getElemsHtml(elems){
    return elems.map(
      function (elem){
        return elem.outerHTML
      }
    ).join('');
  }
  hide.addEventListener('click', hideNews);
})();
