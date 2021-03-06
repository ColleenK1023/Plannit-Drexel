var request = require('request');
var cheerio = require('cheerio');
var url = require('./form').url;

module.exports.list = function(req, res) {
    request(url, function(error, request, body) {
        $ = cheerio.load(body);
        var children = $('select#term').children();
        var terms = {};
        var value, data;
        children.each(function(_, child) { // we don't need the index
            value = child.attribs.value;
            data = child.children[0].data;
            terms[value] = data;
        });
        delete terms['0']; // remove 'Select a Term' default option
        res.set('Content-Type', 'application/json');
        res.send(terms);
    });
};
