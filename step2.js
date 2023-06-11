const fs = require('fs');
const axios = require('axios');

let cat = function (path) {
    fs.readFile(path, 'utf8', function (err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log(data);
    });
};

let webCat = async function (url) {
    try {
        let resp = await axios.get(url);
        console.log(resp.data);
    } catch (err) {
        console.error(`Error fetching ${url}: ${err}`);
        process.exit(1);
    }
};

const args = process.argv.slice(2);

for (let arg of args) {
    if (arg.startsWith('http://') || arg.startsWith('https://')) {
        webCat(arg);
    } else { cat(arg); }
}

