const fs = require('fs');
const axios = require('axios');
const args = process.argv.slice(2);

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

const outputToFile = function (content, readFile) {
    fs.writeFile(readFile, content, err => {
        if (err) {
            console.error(`Couldn't write to ${readFile}:`);
            console.log("ERROR!!!", err);
            process.exit(1);
        }
        console.log("IT WORKED!");
    });
};

if (args[0] === '--out') {
    if (args.length < 3) {
        console.error('No output file specified');
        process.exit(1);
    }

    readFile = args[1];
    content = args[2];
    outputToFile(content, readFile);

} else {
    for (let arg of args) {
        if (arg.startsWith('http://') || arg.startsWith('https://')) {
            webCat(arg);
        } else { cat(arg); }
    }
}





