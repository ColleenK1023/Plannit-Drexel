var request = require('request');
var cheerio = require('cheerio');
var form = require('./form');

function getTerm(req, res, term, results, i) {

    var url = form.url;
    var name = req.query.name || '';
    var number = req.query.number || '';
    var crn = req.query.crn || '';

      console.log("made it to getTerm");

      var formdata = form.buildForm(term, name, number, crn);

      console.log(url);
      console.log(formdata);

      request.post({ url: url, form: formdata }, function (error, request, body) {
            $ = cheerio.load(body);
            //console.log(body);
//            var results = {};
//            var i = 0;
            console.log("New request");

            $(".even, .odd").each(function() {
                var obj = {};
                var j = 0;
                $(this).find('td [valign=top] , td [valign=center]').each(function() {
                    switch (j) {
                        case 0:
                            obj.subjectcode = $(this).text();
                            break;
                        case 1:
                            obj.coursenumber = $(this).text();
                            break;
                        case 2:
                            obj.instrtype = $(this).text();
                            break;
                        case 3:
                            obj.section = $(this).text();
                            break;
                        case 4:
                            obj.crn = $(this).text();
                            break;
                        case 5:
                            obj.coursetitle = $(this).text();
                            break;
                        case 6:
                            obj.instructor = $(this).text();
                            break;
                        default:
                            break;
                    }
                    j++;
                })
                console.log(obj);
                // Ignore non-course table entries
                if(Object.keys(obj).length !== 0) {
                    results[i] = obj;
                    i++;
                }
                obj.term = term.toString();

            })

            //console.log("got the results for " + term);

            if (term == 1) {
                term++;
                getTerm(req, res, term, results, i);

            } else if (term == 2) {
                term++;
                getTerm(req, res, term, results, i);
            } else if (term == 3) {
                term++;
                getTerm(req, res, term, results, i);
            } else if (term == 4) {
              //  console.log("these are the final results: " + results);
                res.set('Content-Type', 'application/json');
                res.send(results);
            }

        });
}

module.exports.yearSearch = function(req, res) {

    var url = form.url;
    var name = req.query.name || '';
    var number = req.query.number || '';
    var crn = req.query.crn || '';
    console.log("Where is this?");
    console.log(name);
    var results;
    console.log(url);
    getTerm(req, res, 1, {}, 0);

}
