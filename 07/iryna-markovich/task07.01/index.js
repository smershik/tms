(function () {
    window.qs = document.querySelector.bind(document);
    window.dce = document.createElement.bind(document);
    window.ce = createElement;

    let nav = qs('.nav');
    let container = qs('.container');

    let sources = [];
    let articles = [];

    let urlSources = 'https://newsapi.org/v2/sources?apiKey=e5962655fcc6456e8a7437ae7f1b691b&language=ru';
    let urlNews = 'https://newsapi.org/v2/everything?apiKey=e5962655fcc6456e8a7437ae7f1b691b';

    function createElement(elemName, options, attributes) {
        attributes = attributes || {};
        var elem = dce(elemName);

        Object.assign(elem, options);

        Object.keys(attributes).forEach(function (key) {
            elem.setAttribute(key, attributes[key]);
        });
        return elem;
    }

    let xhr = new XMLHttpRequest();
    xhr.open('GET', urlSources);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState != 4) return;
        sources = JSON.parse(xhr.response).sources;
        renderButtons(sources);
    }

    function renderButtons(sources) {
        sources.forEach(function (sources) {
            let buttonElem = ce('BUTTON',
                { className: 'nav__button' },
                { 'data-role': 'button' }
            );
            buttonElem.innerText = sources.id;
            nav.appendChild(buttonElem);
            nav.addEventListener('click', showNews);
        });
    }


    
    function showNews(event) {
        let target = event.target;
        if (target.getAttribute('data-role') != 'button') return; 

        nav.addEventListener('click', clearNews);

        let urlSources = urlNews + '&sources=' + event.target.innerText;

        let xhr = new XMLHttpRequest();
        xhr.open('GET', urlSources);
        xhr.send();
        xhr.onload = function () {
            articles = JSON.parse(xhr.response).articles;
            renderNews();
        }
    }

    function renderNews() {
        let containerInner = ce('DIV',
            { className: 'container-inner' },
        );
        articles.forEach(function (articles) {
            let divElem = ce('DIV',
            );
            containerInner.appendChild(divElem);
            divElem.innerHTML = '<a href="' + articles.url + '" target=_blank>' +
                '<h2>' + articles.title + '</h2>' +
                '<h3>' + articles.description + '</h3>' +
                '<span>' + articles.publishedAt + '</span>' +
                '</a>';
        });
        container.appendChild(containerInner);
    }

    function clearNews() {
        let containerInner = qs('.container-inner');
        containerInner.remove();
    }

})();