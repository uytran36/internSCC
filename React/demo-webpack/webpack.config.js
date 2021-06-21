const path = require('path');

const config = {
    mode: 'none',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js', 
        path: path.resolve(__dirname, 'build')
    }
}

module.exports = config;