#!/usr/bin/env node

const fs = require('fs');
const pkgInfo = require('../package.json');

let Logger = {
    log: function() {
        console.log.apply(console, arguments);
    }
};

let sourceFileName = process.argv && process.argv[2];

if (!sourceFileName) {
    Logger.log("");
    Logger.log("Error: Missing Source filename");
    Logger.log("");
    Logger.log("Usage:");
    Logger.log("npx npx-bin/file-transformer <filename_or_path>");
    Logger.log("");
    Logger.log("file-transformer@" + pkgInfo.version + " is a CLI and cannot be used from NodeJS scripts currently.");
    Logger.log("For more information, refer the readme file here . . .");
    Logger.log("https://github.com/npx-bin/file-transformer/blob/master/README.md");
    Logger.log("");
    Logger.log("");
    process.exit(1);
} else {
    Logger.log("file-transformer@" + pkgInfo.version + " --> Reading file: " + sourceFileName);
    fs.readFile(sourceFileName, (err,data)=>{
        if (err) {
            Logger.log("\n", err, "\n\n");
            return;
        }
        Logger.log("\t[ Initializing transformation . . . ]");
        for (let i = 0; i < data.length; i++) {
            data[i] = data[i] ^ 2 ^ 11 ^ 121 ^ (i + 1);
        }
        Logger.log("\t[ Transformation complete ]");
        Logger.log("\t[ Writing file . . . ]");
        let suffix = "";
        if (sourceFileName.indexOf(".k11") === -1) {
            suffix = ".k11";
        }
        let newFileName = sourceFileName.split(".k11").join("") + suffix;
        fs.writeFile(newFileName, data, (err)=>{
            if (err) {
                throw err;
            }
            Logger.log("\nfile-transformer@" + pkgInfo.version + " --> File has been created: " + newFileName + "\n\n");
        });
    });
}
