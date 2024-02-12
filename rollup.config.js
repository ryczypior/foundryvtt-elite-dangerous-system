const fs = require("fs")
const path = require("path")
const foundryPath = require("./foundry-path.js");
import copy from 'rollup-plugin-copy-watch'
import scss from 'rollup-plugin-scss'
import jscc from 'rollup-plugin-jscc'

let manifest = JSON.parse(fs.readFileSync("./system.json"))

let systemPath = foundryPath.systemPath(manifest.id)

console.log("Bundling to " + systemPath)
export default {
    input: [`${manifest.id}.js`],
    output: {
        file : path.join(systemPath, `${manifest.id}.js`)
    },
    watch : {
        clearScreen: true
    },
    plugins: [
        jscc({      
            values : {_ENV :  process.env.NODE_ENV}
        }),
        scss({
            output: `./static/css/edrpg.css`,
            failOnError: true,
            runtime: require("sass"),
            quietDeps: true,
        }),
        copy({
            targets : [
                {src : "./template.json", dest : systemPath},
                {src : "./system.json", dest : systemPath},
                {src : "./static/*", dest : systemPath},
            ],
            watch: process.env.NODE_ENV == "production" ? false : ["./static/*/**", "system.json", "template.json"]
        })
    ],
    onwarn(warning, warn) {
        if (warning.code === 'EVAL') return
        warn(warning)
    }
}
