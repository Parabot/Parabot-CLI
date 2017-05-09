#!/usr/bin/env node
console.log('Welcome to the Parabot CLI, note that this is still in Alpha');
var program = require('commander');
var chalk = require('chalk');
var http = require('http');
var fs = require('fs');
var download = require('download-file');

program
    .arguments('<command>')
    .option('-u, --username <username>', 'The user to authenticate as')
    .option('-p, --password <password>', 'The user\'s password')
    .action(function (command) {
        switch (command) {
            case "start":
                console.log("Downloading Parabot");

                var file = fs.createWriteStream("Parabot.jar");
                var request = http.get("http://v3.bdn.parabot.org/api/bot/download/client", function (response) {
                    response.pipe(file);

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