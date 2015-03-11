/* jshint expr: true */

(function () {
    'use strict';

    require.config({
        baseUrl: '.',
        paths: {
            'text': 'bower_components/requirejs-text/text'
        }
    });

    function withPage(name, callback) {
        require(['text', 'text!resources/' + name], function(module, html) {
            var page = document.implementation.createHTMLDocument();
            page.documentElement.innerHTML = html;
            callback(page);
        });
    }

    describe('Product scrapper', function () {

        describe('on Amazon book product page', function () {

            it('should parse Amazon books', function (done) {
                require(['product-scraper'], function(scraper) {
                    withPage('amazon-book.html', function(html) {
                        var product = scraper.scrape(html, 'http://www.amazon.co.uk/Dust-Wool-Trilogy-Hugh-Howey/dp/0099586738');
                        expect(product.type).to.exist.and.equal('Book');
                        done();
                    });
                });
            });

            it('should parse Amazon book titles', function (done) {
                require(['product-scraper'], function(scraper) {
                    withPage('amazon-book.html', function(html) {
                        var product = scraper.scrape(html, 'http://www.amazon.co.uk/Dust-Wool-Trilogy-Hugh-Howey/dp/0099586738');
                        expect(product.title).to.exist.and.equal('Dust: (Wool Trilogy 3)');
                        done();
                    });
                });
            });

            it('should parse Amazon book ISBNs', function (done) {
                require(['product-scraper'], function(scraper) {
                    withPage('amazon-book.html', function(html) {
                        var product = scraper.scrape(html, 'http://www.amazon.co.uk/Dust-Wool-Trilogy-Hugh-Howey/dp/0099586738');
                        expect(product.code).to.exist.and.equal('0099586738');
                        done();
                    });
                });
            });

            it('should parse Amazon books without SEO', function (done) {
                require(['product-scraper'], function(scraper) {
                    withPage('amazon-book.html', function(html) {
                        var product = scraper.scrape(html, 'http://www.amazon.co.uk/dp/0099586738');
                        expect(product.type).to.exist.and.equal('Book');
                        done();
                    });
                });
            });

            it('should parse Amazon books on TLS redirect', function (done) {
                require(['product-scraper'], function(scraper) {
                    withPage('amazon-book.html', function(html) {
                        var product = scraper.scrape(html, 'http://www.amazon.co.uk/gp/product/0099586738?*Version*=1&*entries*=0');
                        expect(product.type).to.exist.and.equal('Book');
                        done();
                    });
                });
            });

            it('should not parse malformed product page', function (done) {
                require(['product-scraper'], function(scraper) {
                    withPage('bad-amazon-book.html', function(badHtml) {
                        var product = scraper.scrape(badHtml, 'http://www.amazon.co.uk/Dust-Wool-Trilogy-Hugh-Howey/dp/0099586738');
                        expect(product).to.not.exist;
                        done();
                    });
                });
            });
        });

        describe('on Amazon index page', function () {
            it('should not parse non-product page', function (done) {
                require(['product-scraper'], function(scraper) {
                    var product = scraper.scrape({}, 'http://www.amazon.co.uk');
                    expect(product).to.not.exist;
                    done();
                });
            });
        });
    });

})();
