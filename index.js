const SerpApi = require('google-search-results-nodejs');
const search = new SerpApi.GoogleSearch("f3b04eacb6bf796f1a34208c1c05bb39a56d2668c618023c4795efd086b618bc");

const fs = require('fs');

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