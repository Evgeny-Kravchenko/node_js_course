const { program } = require('commander');
const fs = require('fs');
const { stdin } = require('process');
const { pipeline } = require('stream');
const { Transform } = require('readable-stream');

const { checkRequiredParameters, checkFiles } = require('./check-errors');
const { generateTransform } = require('./transform');

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

        const rStream = inputParameter ? fs.createReadStream(inputParameter, { encoding: 'utf-8' }) : process.stdin;
        const wStream = outputParameter ? fs.createWriteStream(outputParameter) : process.stdout;

        const transformer = new Transform({ 
            transform: generateTransform(cmd.action, cmd.shift)
         });

         pipeline(rStream, transformer, wStream, (err) => {
            if (err) {
                console.error('Pipeline failed.', err);
              } else {
                console.log('Pipeline succeeded.');
              }
         });
    });


program.parse(process.argv);
