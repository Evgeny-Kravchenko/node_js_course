const checkRequiredParameters = (action, shift) => {
    if (!action || !shift || !parseInt(shift)) {
        if (!action && !shift) {
            process.stderr.write('You missed the action and the shift required parameters');
        } else if (!action) {
            process.stderr.write('You missed the action required parameter');
        } else if (!shift) {
            process.stderr.write('You missed the shift required parameter');
        } else if (!parseInt(shift)) {
            process.stderr.write('Shift parameter should be a number');
        }
        process.exit(0);
    }
   
};

const checkFiles = (isInputParameter, isOutputParameter, isInputFile, isOutputFile) => {
    if ((isInputParameter && !isInputFile) || (isOutputParameter && !isOutputFile)) {
        if (isInputParameter && !isInputFile) {
            process.stderr.write('There isn\'t such input file or you don\'t have access to it. Change the input path and try again\n');
        }
        if (isOutputParameter && !isOutputFile) {
            process.stderr.write('There isn\'t such output file or you don\'t have access to it. Change the output path file and try again.\n');
        }
        process.exit(0);
    }
};

module.exports = {
    checkRequiredParameters,
    checkFiles
};