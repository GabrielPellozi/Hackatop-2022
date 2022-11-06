const {numberTypes}  = require('./types.js');

var fs = require('fs');

function queryResults(searchQuery = "varejo crescimento 2021")
{
    const SerpApi = require('google-search-results-nodejs');
    const search = new SerpApi.GoogleSearch("f3b04eacb6bf796f1a34208c1c05bb39a56d2668c618023c4795efd086b618bc");

    const params = {
        engine: "google",
        q: searchQuery,
        kl: "pt-br"
    };

    const callback = function(data) {
        console.log(data);
        fs.writeFileSync(searchQuery + ".json", JSON.stringify(data))
    };

    // Show result as JSON
    search.json(params, callback);
}

function getWordCount(str) {
    return str.trim().split(/\s+/).length;
}

// /**
//  * @param {string} jsonString - JSON file to search for keywords
//  */
// function searchOrganicResults(jsonString)
// {

// }

String.prototype.replaceAt = function(index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}

/**
 * @param {string} keyword 
 * @param {string array} words 
 * @param {numberTypes} desiredNumberType
 */
function getWordDistance(keyword, words, desiredNumberType)
{
    let distance = 0;
    for (let i = 0; i < words.length; ++i)
    {
        let wordFiltered = words[i];

        let thisNumberType = numberTypes.ANY;

        if (words[i][words[i].length - 1] == ',')
        {

            thisNumberType = numberTypes.REGULAR;
            if (words[i][words[i].length - 2] == '%')
            {
                thisNumberType = numberTypes.PERCENTAGE;
            }
            wordFiltered = words[i].replaceAt(words[i].length - 1, ' ');
        }

        if (words[i][words[i].length - 1] == '%')
        {
            thisNumberType = numberTypes.PERCENTAGE;


            wordFiltered = words[i].replaceAt(words[i].length - 1, ' ');
        }

        ++distance;
        if (!isNaN(parseFloat(wordFiltered.replace(/,/g, '.')))) // if it's a number
        {
            if (desiredNumberType == numberTypes.ANY)
            {
                console.log(words[i] + "   " + distance);
                return (words[i] + "   " + distance);
            }
            if (thisNumberType == numberTypes.PERCENTAGE && desiredNumberType == numberTypes.PERCENTAGE)
            {
                console.log(words[i] + "   " + distance);
                return (words[i] + "   " + distance);
            }
            if (thisNumberType == numberTypes.REGULAR && desiredNumberType == numberTypes.REGULAR)
            {
                console.log(words[i] + "   " + distance);
                return (words[i] + "   " + distance);
            }
        }

        if (words[i] == keyword)
        {
            distance = 0;
        }
    }
}

// queryResults();

fs.readFile('varejo crescimento 2021.json', 'utf8', function(err, data){
    if (err)
    {
        console.error(err);
        return;
    }
      
    var jsonData = JSON.parse(data);
    var organic_words = [];

    let organicResultsLength = jsonData.organic_results.length;

    for (let i = 0; i < organicResultsLength; ++i)
    {
        organic_words[i] = new Array(organicResultsLength);
        organic_words[i] = jsonData.organic_results[i].snippet.split(" ");
    }

    for (let i = 0; i < organic_words.length; ++i)
    {
        getWordDistance("PIB", organic_words[i], numberTypes.PERCENTAGE);
    }

    const distances = [];
    for (let i = 0; i < organic_words.length; ++i)
    {
        distances.push(getWordDistance("PIB", organic_words[i], numberTypes.PERCENTAGE));
    }

    fs.writeFileSync("distances.json", JSON.stringify(distances))

    var organicResults = jsonData.organic_results;
});