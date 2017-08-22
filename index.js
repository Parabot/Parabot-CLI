#!/usr/bin/env node
console.log('Welcome to the Parabot CLI, note that this is still in Alpha');
var program = require('commander');
var chalk = require('chalk');
var http = require('http');
var fs = require('fs');

program
    .arguments('<command>')
    .option('-u, --username <username>', 'The user to authenticate as')
    .option('-p, --password <password>', 'The user\'s password')
    .option('-n, --nightly', 'Is client nightly?')
    .option('-nv, --noverify', 'Java command noverify')
    .option('-l, --local', 'Load local scripts/servers')
    .option('-v, --verbose', 'Verbose mode')
    .option('-d, --dump', 'Dump data')
    .action(function (command) {
        switch (command) {
            case "start":
                console.log("Downloading Parabot");

                var file = fs.createWriteStream("Parabot.jar");
                var request = http.get("http://v3.bdn.parabot.org/api/bot/download/client?nightly=" + program.nightly, function (response) {
                    response.pipe(file);
                    file.on('finish', function () {
                        var username = program.username;
                        var password = program.password;
                        var local = program.local ? "-loadlocal" : "";
                        var verbose = program.verbose ? "-v" : "";
                        var dump = program.dump ? "-dump" : "";
                        var clearcache = program.clearcache ? "-clearcache" : "";
                        var noverify = program.noverify ? "-noverify" : "";

                        var exec = require('child_process').exec;
                        module.exports = exec("java -jar " + noverify + " ./Parabot.jar -login "
                            + username + " " + password + " "
                            + local + " " + verbose + " " + clearcache + " " + dump,
                            function (error, stdout) {
                                console.log('Output -> ' + stdout);
                                if (error !== null) {
                                    console.log("Error -> " + error);
                                }
                            });
                    });

                    console.log("Downloaded Parabot");
                });
                break;
            case "init":

                break;
            default:
                console.error(chalk.red(command + " is an invalid command"));
                break;
        }
    })
    .parse(process.argv);