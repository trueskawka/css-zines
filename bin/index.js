#!/usr/bin/env node

const fs   = require('fs');
const path = require('path');

const setup = require('./setup.js');
const build = require('./build.js');

// get script arguments
const args = process.argv.slice(2);

// get zine path from arguments
const zinePath = args.shift();
if (!zinePath) {
    console.error('Missing zine name!');
}

const cmd = args.shift();
if (!cmd) {
    console.error('Missing command for the script!');
}

const cssPath = path.join(zinePath, 'css');
const partialsPath = path.join(zinePath, 'partials');

// watch partials and CSS files for changes, rebuild
const watch = () => {
    console.log('\nWatching build files');
    fs.watch(partialsPath, (event, file) => {
        console.log(`Changes in: ${file}`);
        build.build(zinePath, partialsPath, cssPath);
    });
    fs.watch(cssPath, (event, file) => {
        console.log(`Changes in: ${file}`);
        build.build(zinePath, partialsPath, cssPath);
    })
}

switch(cmd) {
    // set up the directory for the zine
    case 'setup':
        setup.setup(zinePath, partialsPath, cssPath);
        break;
    // build zine files
    case 'build':
        build.build(zinePath, partialsPath, cssPath);
        break;
    // watch and build on changes
    case 'dev':
        build.build(zinePath, partialsPath, cssPath);
        watch();
        break;
    default:
        console.error(`Error: Command ${cmd} not implemented!`)
        break;
}



// console.log(process.argv.slice(2));
// text.split(/\r?\n/).forEach(function (line) {
//     console.log(line);
// });
// const text = fs.readFileSync('kitten', "utf8");
// fs.appendFileSync('kitten', '456', 'utf8');
// remove previous output file before generating (not necessary, overwritten)
// fs.unlinkSync(indexFile);

// const zineDir = path.parse(zinePath);
// const outputFile = zinePath.name();