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

const cssPath = path.join(zinePath, 'styles');
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
    case 'watch':
        build.build(zinePath, partialsPath, cssPath);
        watch();
        break;
    default:
        console.error(`Error: Command ${cmd} not implemented!`)
        break;
}