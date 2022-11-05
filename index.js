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

fs.readFile('varejo pip 2022.json', 'utf8', function(err, data){
    if (err)
    {
        console.error(err);
        return;
    }
      
    var jsonData = JSON.parse(data);
    // var organicResults = jsonData.organic_results[0].snippet;
    var organicResults = jsonData.organic_results;
    console.log(organicResults);
});
  










