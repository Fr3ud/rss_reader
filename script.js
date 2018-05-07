(function (window, document) {
    function Articles() {
        this.articles = {};
        this.settings = {
            apiUrl: 'https://rss-deploy.herokuapp.com/rss/url/?feedUrl=http%3A%2F%2Ffeeds.frontender.info%2FFrontenderMagazine'
        };
        this.domElems = {
            articleTemplate: document.getElementsByClassName('article_template')[0]
        };
    }

    Articles.prototype.init = function () {
        console.log(this.getData());
    };

    Articles.prototype.getData = function () {
        const __self = this;

        fetch(this.settings.apiUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                __self.articles = data.entries;
                __self.update();
                // console.log(this.articles);
                // console.log(data);
            })
            .catch( function (err) {
                console.log(err)
            });
        return this;
    };

    Articles.prototype.update = function () {
        const articlesHtml = this.generateAll();
        const articlesDomElem = document.querySelectorAll('.articles')[0];

        articlesDomElem.innerHTML = ''; //clear
        articlesDomElem.appendChild(articlesHtml);
    };

    Articles.prototype.generateAll = function () {
        const __self = this;
        const articlesHtml = document.createDocumentFragment();

        this.articles.forEach(function (item) {
            articlesHtml.appendChild(__self.generateArticle(item));
        });
        // const articlesHtml = this.articles.map(function (item) {
        //     return __self.generateArticle(item);
        // });

        return articlesHtml;
    };

    Articles.prototype.generateArticle = function (itemData) {
        const newArticle = this.domElems.articleTemplate.cloneNode(true);

        newArticle.classList.remove('article_template');
        newArticle.getElementsByClassName('post-heading')[0].innerHTML = itemData.title._;
        newArticle.getElementsByClassName('excerpt')[0].innerHTML = itemData.contentSnippet;
        newArticle.getElementsByClassName('article__date')[0].innerHTML = this.convertDate(itemData.pubDate);

        newArticle.getElementsByClassName('post-heading')[0].setAttribute('href', itemData.link);
        newArticle.getElementsByClassName('action-button')[0].setAttribute('href', itemData.link);
        console.log(newArticle);

        return newArticle;
    };

    Articles.prototype.convertDate = function (dateStr) {
        return new Date(dateStr);
    };

    const articles = new Articles();

    articles.init();

    // console.dir(articles);
})(window, document);