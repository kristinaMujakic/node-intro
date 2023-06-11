const fs = require('fs');

let cat = function (path) {
    path = process.argv.slice(2).toString();
    fs.readFile(path, 'utf8', function (err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log(data);
    });
};

cat()


