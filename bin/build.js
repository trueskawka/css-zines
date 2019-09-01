const fs     = require('fs');
const path   = require('path');
const colors = require('./colors.json');

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
    const inputPath = path.join(cssPath, 'main.scss');
    let css = fs.readFileSync(inputPath, 'utf-8');

    // 1. get all the CSS partials (if any exist)
    //    put them in placeholder spots
    const partialsRegExp = new RegExp(/@include .+;$/g);
    const partials = css.match(partialsRegExp);

    if (partials) {
        partials.forEach((partial) => {
            const fileName = partial.replace(/@include |;/g, '');
            const filePath = path.join(cssPath, `${fileName}.scss`);
            let file = '';
            if (!fs.existsSync(filePath)) {
                console.error(`SCSS file ${fileName} missing, skipping`);
            } else {
                file = fs.readFileSync(filePath, 'utf-8');
            }
            css = css.replace(partial, file);
        })
    }

    // 0. add variables for colors
    const variableRegExp = new RegExp(/\$.+;/g);
    const variables = css.match(variableRegExp);

    if (variables) {
        variables.forEach((variable) => {
            const value = variable.replace(/[$|;]/g, '');
            css = css.replace(variable, colors[value] + ';');
        })
    }

    // 2. remove comments
    css = css.replace(/\/\*.*\*\//g, '');

    // 3. remove most whitespace
    css = css.replace(/\n[\s]*/g, '');
    css = css.replace(/;}/g, '}');
    css = css.replace(/ {/g, '{');
    css = css.replace(/: /g, ':');

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