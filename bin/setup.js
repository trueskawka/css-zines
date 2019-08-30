const fs   = require('fs');
const path = require('path');

const initialHTML = fs.readFileSync(path.join(__dirname, '/index.html'));
const initialCSS = fs.readFileSync(path.join(__dirname, './main.css'));

module.exports = {
    setup: function(zinePath, partialsPath, cssPath) {
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
        fs.writeFileSync(path.join(cssPath, 'main.css'), initialCSS);
    }
}