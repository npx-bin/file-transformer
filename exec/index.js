#!/usr/bin/env node

const fs = require('fs');

let Logger = {
    log: function() {
        console.log.apply(console, arguments);
    }
};

let sourceFileName = process.argv && process.argv[2];

if (!sourceFileName) {
    Logger.log("\nError: Missing Source filename\n\nUsage:\nnpx npx-bin/file-transformer <filename_or_path>\n");
    Logger.log("This module is a CLI and cannot be used from a node js file currently.");
    Logger.log("For more information, refer the readme file here . . .");
    Logger.log("https://github.com/npx-bin/file-transformer/blob/master/README.md\n\n");
} else {
    Logger.log("Reading file: " + sourceFileName);
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
            Logger.log("\nFile has been created:\n" + newFileName + "\n\n");
        });
    });
}
