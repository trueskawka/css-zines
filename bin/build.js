const fs   = require('fs');
const path = require('path');

const buildHTML = (partialsPath, css) => {
    const inputPath = path.join(partialsPath, 'index.html');
    let html = fs.readFileSync(inputPath, 'utf-8');

    // 1. get all the HTML partial files (if any exist)
    //    put them in placeholder spots
    const partRegExp = new RegExp(/{{ (.*) }}/g);
    const partials = html.match(partRegExp);
    if (partials) {
        partials.forEach((partial) => {
            const fileName = partial.replace(/[{|}| ]/g, '');
            const filePath = path.join(partialsPath, `${fileName}.html`);
            let file = '';
            if (!fs.existsSync(filePath)) {
                console.error(`Partial ${fileName} missing, skipping`);
            } else {
                file = fs.readFileSync(filePath, 'utf-8');
            }
            html = html.replace(partial, file);
        });
    }

    // 2. put css in the <style> tag
    // TO-IMPROVE
    html = html.replace('<style></style>', `<style>${css}</style>`);

    return html;
}

const buildCSS = (cssPath) => {
    const inputPath = path.join(cssPath, 'main.css');
    let css = fs.readFileSync(inputPath, 'utf-8');

    // 0. add variables for colors
    // TO-DO

    // 1. get all the CSS partials (if any exist)
    //    put them in placeholder spots
    // TO-DO

    // 2. remove comments
    css = css.replace(/(\/\*.*\*\/)/g, '');

    // 3. remove whitespace
    // css = css.replace(/\s/g,'');

    return css;
}

// build output HTML and overwrite existing output
module.exports = {
    build: function(zinePath, partialsPath, cssPath) {
        const css = buildCSS(cssPath);
        const html = buildHTML(partialsPath, css);

        console.log('Building zine files...');
        const indexFile = path.join(zinePath, 'index.html');
        fs.writeFileSync(indexFile, html);
        console.log('Zine built!');
    }
}