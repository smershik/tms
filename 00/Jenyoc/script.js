(function () {
  var sourceButton, sources,

      newsBlock = document.querySelector('.newsBlock'),
      container = document.querySelector('.news'),
      clear = document.querySelector('.clear'),

      url = 'https://newsapi.org/v2/sources?apiKey=3e04d75c3df0462c91e62abf7c794fb2&language=ru',
      xhr = new XMLHttpRequest();

  xhr.open('GET', url);
  xhr.send();

  xhr.onload = function () {
    sources = JSON.parse(xhr.response).sources;
    renderSources();
  };

  function clearNews(event) {
    newsBlock.innerText = '';
  }

  function getNews(event) {
    clearNews();
    var urlNews = 'https://newsapi.org/v2/top-headlines?apiKey=3e04d75c3df0462c91e62abf7c794fb2&sources=',
      newsSources = urlNews + event.target.innerText;
    newsXhr = new XMLHttpRequest();
    newsXhr.open('GET', newsSources);
    newsXhr.send();
    newsXhr.onload = function () {
      news = JSON.parse(newsXhr.response).articles;
      renderNews();
    };
  }

  function renderNews() {
    news.forEach(function (item) {
      var block = createElement('section', {});
      block.innerHTML = '<a href="' + item.url + '">' +
        '<h1>' + item.title + '</h1>' +
        '</a>' +
        '<p>' + item.description + '</p>' + '<br>';
      newsBlock.appendChild(block);
    });
  }

  function createElement(elemName, options, attributes) {
    attributes = attributes || {};
    var elem = document.createElement(elemName);
    Object.assign(elem, options);
    Object.keys(attributes).forEach(function (key) {
      elem.setAttribute(key, attributes[key]);
    });
    return elem;
  }

  function renderSources() {
    var i = 0;
    sources.forEach(function (item) {
      sourceButton = createElement('button', {innerText: sources[i].id, className: 'button' + i});
      i++;
      container.appendChild(sourceButton);
      container.addEventListener('click', getNews);
    });
  }

  clear.addEventListener('click', clearNews);
})();
