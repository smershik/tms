(function () {
  var newsId, getSources, gn, block,
    url = 'https://newsapi.org/v2/sources?apiKey=3e04d75c3df0462c91e62abf7c794fb2&language=ru',

    input=  document.querySelector('.inp'),
    newsBlock= document.querySelector('.newsBlock'),
    xhrContainer = document.querySelector('.news'),

    xhr= new XMLHttpRequest();
  xhr.open('GET',url);
  xhr.send();

  xhr.onreadystatechange=function(){
    console.log(xhr.readyState);
    if(xhr.readyState!==4) return;
    getSources=JSON.parse(xhr.response).sources;
    renderXhr(xhr);
  };
  /*ща будет пздц костыль...*/
  function getGn(event) {
    newsId='google-news-ru';
    giveMeThisNews();
  }
  function getLenta(event) {
    newsId='lenta';
    giveMeThisNews();
  }
  function getRbc(event) {
    newsId='rbc';
    giveMeThisNews();
  }
  function getRt(event) {
    newsId='rt';
    giveMeThisNews();
  }
  function giveMeThisNews() {
    var urlNews = 'https://newsapi.org/v2/top-headlines?apiKey=3e04d75c3df0462c91e62abf7c794fb2&sources='+newsId;
    var news=new XMLHttpRequest();
    news.open('GET',urlNews);
    news.send();
    news.onreadystatechange=function(){
      console.log(news.readyState);
      if(news.readyState!==4) return;
      getNews=JSON.parse(news.response).articles;
      console.log(getNews);
      getNews.forEach(function (item) {
        block=createElement('div', {
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
  function renderXhr(xhr){
    var gnID = createElement('button', {innerText: getSources[0].id, className:'gn'}),
      lentaID = createElement('button', {innerText: getSources[1].id, className:'lenta'}),
      rbcID = createElement('button', {innerText: getSources[2].id, className:'rbc'}),
      rtID = createElement('button', {innerText: getSources[3].id, className:'rt'}),
      xhrBox = createElement('DIV');
    xhrBox.innerHTML += getElemsHtml([gnID,lentaID,rbcID,rtID]);
    xhrContainer.appendChild(xhrBox);
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
})();
