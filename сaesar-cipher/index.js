const { program } = require('commander');
const fs = require('fs');
const { checkRequiredParameters, checkFiles } = require('./check-errors');

program.option('-s, --shift <shift>', 'please enter a shift')
    .option('-i, --input <file>', 'Select an input file')
    .option('-o, --output <file>', 'Select an output file')
    .option('-a, --action <action>', "Select needed action")
    .action((cmd) => {
        const inputParameter = cmd.input;
        const outputParameter = cmd.output;
        const isInputExist = fs.existsSync(inputParameter);
        const isOutputExist = fs.existsSync(outputParameter);
        checkRequiredParameters(cmd.action, cmd.shift);
        checkFiles(inputParameter, outputParameter, isInputExist, isOutputExist);
    });


program.parse(process.argv);
