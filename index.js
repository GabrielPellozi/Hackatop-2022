var fs = require('fs');

function queryResults()
{
    const SerpApi = require('google-search-results-nodejs');
    const search = new SerpApi.GoogleSearch("f3b04eacb6bf796f1a34208c1c05bb39a56d2668c618023c4795efd086b618bc");

    const params = {
        engine: "google",
        q: "varejo pib 2022",
        kl: "us-en"
    };

    const callback = function(data) {
        console.log(data);
        fs.writeFileSync("varejo pip 2022.json", JSON.stringify(data))
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

/**
 * @param {string} keyword 
 * @param {string array} words 
 */
function getWordDistance(keyword, words)
{
    let distance = 0;
    for (let i = 0; i < words.length; ++i)
    {
        ++distance;
        if (!isNaN(words[i]))
        {
            console.log(words[i] + "   " + distance);
            return distance;
        }

        if (words[i] == keyword)
        {
            distance = 0;
        }
    }
}

fs.readFile('varejo pip 2022.json', 'utf8', function(err, data){
    if (err)
    {
        console.error(err);
        return;
    }
      
    var jsonData = JSON.parse(data);
    var organic_words = [];

    let organicResultsLength = jsonData.organic_results.length;

    // var organicResults = jsonData.organic_results[0].snippet;
    for (let i = 0; i < organicResultsLength; ++i)
    {
        organic_words[i] = new Array(organicResultsLength);
        organic_words[i] = jsonData.organic_results[i].snippet.split(" ");
    }



    console.log(organic_words);

    getWordDistance("PIB", organic_words[0]);

    var organicResults = jsonData.organic_results;
    // console.log(organicResults);
});