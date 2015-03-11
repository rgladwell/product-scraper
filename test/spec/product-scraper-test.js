/* jshint expr: true */

(function () {
    'use strict';

    var html = '<!doctype html>\
<head>\
<link rel=\"canonical\" href=\"http://www.amazon.co.uk/Dust-Wool-Trilogy-Every-beginning/dp/1780891881\" />\
<link rel=\"alternate\" media=\"handheld\" href=\"http://www.amazon.co.uk/gp/aw/d/0099586738\" />\
<meta name=\"description\" content=\"Buy Dust: (Wool Trilogy 3) by Hugh Howey (ISBN: 9780099586739) from Amazon&#39;s Book Store. Free UK delivery on eligible orders.\" />\
<meta name=\"title\" content=\"Dust: (Wool Trilogy 3): Amazon.co.uk: Hugh Howey: Books\" />\
\
<meta name=\"keywords\" content=\"Hugh Howey,Dust: (Wool Trilogy 3),Arrow,0099586738,Modern &amp; contemporary fiction (post c 1945),Science Fiction,Fantasy,FICTION / Science Fiction / General,Fiction - Science Fiction,Fiction / Science Fiction / Hard Science Fiction,Science Fiction &amp; Fantasy,Science Fiction - General,Science Fiction - Hard Science Fiction\" />\
<title>Dust: (Wool Trilogy 3): Amazon.co.uk: Hugh Howey: Books</title>\
</head>\
\
<div class=\"a-section a-spacing-none\">\
    <h1 id=\"title\" class=\"a-size-large a-spacing-none\">\
      <span id=\"productTitle\" class=\"a-size-large\">Dust: (Wool Trilogy 3)</span>\
        <span class=\"a-size-medium a-color-secondary a-text-normal\">Paperback</span>\
          <span class=\"a-size-medium a-color-secondary a-text-normal\">&ndash; 13 Feb 2014</span>\
    </h1>\
</div>\
\
<ul>\
<li><b>Paperback:</b> 416 pages</li>\
<li><b>Publisher:</b> Arrow (13 Feb 2014)</li>\
<li><b>Language:</b> English</li>\
<li><b>ISBN-10:</b> 0099586738</li>\
<li><b>ISBN-13:</b> 978-0099586739</li>\
</ul>\
\
<div id=\"combinedBuyBox\" class=\"a-section a-spacing-medium\">\
  <form method=\"post\" id=\"addToCart\" action=\"/gp/product/handle-buy-box/ref=dp_start-bbf_1_glance\" class=\"a-content\">\
    <input type=\"hidden\" id=\"ASIN\" name=\"ASIN\" value=\"0099586738\">\
</form>\
</div>';


    var badHtml = '<!doctype html><head></head><body></body></html>';

    describe('Product scrapper', function () {

        describe('on Amazon book product page', function () {

            var amazonBookDocument = document.implementation.createHTMLDocument();
            amazonBookDocument.documentElement.innerHTML = html;

            it('should parse Amazon books', function (done) {
                require(['product-scraper'], function(scraper) {
                    var product = scraper.scrape(amazonBookDocument, 'http://www.amazon.co.uk/Dust-Wool-Trilogy-Hugh-Howey/dp/0099586738');
                    expect(product.type).to.exist.and.equal('Book');
                    done();
                });
            });

            it('should parse Amazon book titles', function (done) {
                require(['product-scraper'], function(scraper) {
                    var product = scraper.scrape(amazonBookDocument, 'http://www.amazon.co.uk/Dust-Wool-Trilogy-Hugh-Howey/dp/0099586738');
                    expect(product.title).to.exist.and.equal('Dust: (Wool Trilogy 3)');
                    done();
                });
            });

            it('should parse Amazon book ISBNs', function (done) {
                require(['product-scraper'], function(scraper) {
                    var product = scraper.scrape(amazonBookDocument, 'http://www.amazon.co.uk/Dust-Wool-Trilogy-Hugh-Howey/dp/0099586738');
                    expect(product.code).to.exist.and.equal('0099586738');
                    done();
                });
            });

            it('should parse Amazon books without SEO', function (done) {
                require(['product-scraper'], function(scraper) {
                    var product = scraper.scrape(amazonBookDocument, 'http://www.amazon.co.uk/dp/0099586738');
                    expect(product.type).to.exist.and.equal('Book');
                    done();
                });
            });

            it('should parse Amazon books on TLS redirect', function (done) {
                require(['product-scraper'], function(scraper) {
                    var product = scraper.scrape(amazonBookDocument, 'http://www.amazon.co.uk/gp/product/0099586738?*Version*=1&*entries*=0');
                    expect(product.type).to.exist.and.equal('Book');
                    done();
                });
            });

            var badAmazonBookDocument = document.implementation.createHTMLDocument();
            badAmazonBookDocument.documentElement.innerHTML = badHtml;

            it('should not parse malformed product page', function (done) {
                require(['product-scraper'], function(scraper) {
                    var product = scraper.scrape(badAmazonBookDocument, 'http://www.amazon.co.uk/Dust-Wool-Trilogy-Hugh-Howey/dp/0099586738');
                    expect(product).to.not.exist;
                    done();
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
