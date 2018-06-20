(function () {

    var urlSources = 'https://newsapi.org/v2/sources?language=ru&apiKey=ef4baa686f8841129d5dd8ec6cb3ca0a';

    var xhr = new XMLHttpRequest();
    xhr.open('GET', urlSources);
    xhr.send();

    xhr.onload = function (){
        var src;
        if(xhr.readyState == 4) {
            createButtons(JSON.parse(xhr.response).sources);
        }
    }
}());

function createButtons(src) {
    var divButtons = document.getElementById('buttons');
    for(var i = 0; i < src.length; i++) {
        var button = document.createElement('button');
        button.innerText = src[i].name;
        button.id = src[i].id;
        addElem(button, divButtons);
    }
    divButtons.addEventListener('click', function (evt) {
        deleteAllNews();
        renderNews(evt.target.id);
    });
}

function addElem(elem, position) {
    position.appendChild(elem);
}

function renderNews(id) {
    var urlHeadlines = 'https://newsapi.org/v2/top-headlines?sources=' + id + '&apiKey=ef4baa686f8841129d5dd8ec6cb3ca0a';

    var xhr = new XMLHttpRequest();
    xhr.open('GET', urlHeadlines);
    xhr.send();

    xhr.onload = function () {
        var src = JSON.parse(xhr.response).articles;
        console.log(src);
        for (var i = 0; i < src.length; i++) {
            var title = '';
            var author = '';
            var description = '';

            if(src[i].title) title = src[i].title;

            if(src[i].description) description = src[i].description;

            if(src[i].author) author = src[i].author;

            createNews(title, description, author);
        }
    }
}

function createNews(title, description, author) {
    var divForNews = document.createElement('div');
    divForNews.className = 'divForNews';
    addElem(divForNews, document.getElementById('news'));

    var h1 = document.createElement('h1');
    h1.innerText = title;
    addElem(h1, divForNews);

    var p = document.createElement('p');
    p.innerText = description;
    addElem(p, divForNews);

    var span = document.createElement('span');
    span.innerText = author;
    addElem(span, divForNews);

}

function deleteAllNews() {
    document.getElementById('news').remove();
    var div = document.createElement('div');
    div.id = 'news';
    document.body.appendChild(div);
}