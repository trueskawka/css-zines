const fs   = require('fs');
const path = require('path');

const initialHTML = fs.readFileSync(path.join(__dirname, '/index.html'));
const initialCSS = fs.readFileSync(path.join(__dirname, './main.scss'));

module.exports = {
    setup: function(zinePath, partialsPath, cssPath) {
        console.log('Setting up the directory for the zine...');
        if (!fs.existsSync(zinePath)) {
            fs.mkdirSync(zinePath);
        }

        if (!fs.existsSync(partialsPath)) {
            fs.mkdirSync(partialsPath);
        }
        fs.writeFileSync(path.join(partialsPath, 'index.html'), initialHTML);

        if (!fs.existsSync(cssPath)) {
            fs.mkdirSync(cssPath);
        }
        fs.writeFileSync(path.join(cssPath, 'main.scss'), initialCSS);
        console.log(`Your directory is ready at ${zinePath}!`);
    }
}