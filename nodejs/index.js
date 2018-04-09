'use strict';

const request = require("request");
const cheerio = require("cheerio");

request("http://localhost:8000/", (error, response, body) => {
    // Load HTML with cheeriojs
    const $ = cheerio.load(body);

    // Search with CSS Selector
    let emailsByCSSSelector = [];

    $("a[href^=\"mailto\"]").each(function() {
        emailsByCSSSelector.push($(this).text());
    });

    console.log(emailsByCSSSelector);

    // Search everywhere by regex
    let emailsByRegex = $("body").text().match(/[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g);
    
    console.log(emailsByRegex);

    // Save them!
    require('fs').writeFile('emails.csv', emailsByRegex /* or emailsByCSSSelector */, err => { if (err) console.log(err); });
});