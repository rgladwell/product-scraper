'use strict';

define('product-scraper', function () {
    console.log('loading product scrapper module');

    function AmazonBookParser() {
        this.name = 'AmazonBookParser';

        // TODO reptition of URL regular expression in crx manifest
        this.parses = function(doc, url) {
            var validUrl = url.match(/^(https?):\/\/www\.amazon\..+\/(dp|gp)\/.+$/);
            return validUrl && doc && doc.getElementById('ASIN');
        };

        this.parse = function(doc) {
            var product = {};

            var titleElement = doc.getElementById('productTitle');
            if(titleElement) {
                product.title = titleElement.innerHTML;
            }

            var asinElement = doc.getElementById('ASIN');
            if(asinElement) {
                product.code = asinElement.getAttribute('value');
            }

            product.type = 'Book';
            return product;
        };
    }

    var parsers = [
        new AmazonBookParser()
    ];

    return {
        scrape: function(doc, url) {
            for(var i = 0; i < parsers.length; i++) {
                var parser = parsers[i];
                if(parser.parses(doc, url)) {
                    console.log('parsing ' + url + ' with ' + parser.name);
                    var product = parser.parse(doc);
                    return product;
                }
            }
            return null;
        }
    };

});
