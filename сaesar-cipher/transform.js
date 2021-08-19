const LOWER_MIN_CODE = 65;
const LOWER_MAX_CODE = 90;
const UPPER_MIN_CODE = 97;
const UPPER_MAX_CODE = 122;

const ENCODE_ACTION = 'encode';
const DECODE_ACTION = 'decode';

function encode(chunk, shift) {
    for(let i = 0; i < chunk.length; i += 1) {
        if (chunk[i] >= LOWER_MIN_CODE && chunk[i] <= LOWER_MAX_CODE) {
            const isMoreThanMax = chunk[i] + shift > LOWER_MAX_CODE;
            chunk[i] = isMoreThanMax ? LOWER_MIN_CODE - 1 + (chunk[i] - LOWER_MAX_CODE + shift) : chunk[i] + shift;
        } else if (chunk[i] >= UPPER_MIN_CODE && chunk[i] <= UPPER_MAX_CODE) {
            const isMoreThanMax = chunk[i] + shift > UPPER_MAX_CODE;
            chunk[i] = isMoreThanMax ? UPPER_MIN_CODE - 1 + (chunk[i] - UPPER_MAX_CODE + shift) : chunk[i] + shift;
        }
    }
}

function decode(chunk, shift) {
    for(let i = 0; i < chunk.length; i += 1) {
        if (chunk[i] >= LOWER_MIN_CODE && chunk[i] <= LOWER_MAX_CODE) {
            const isLessThanMin = chunk[i] - shift < LOWER_MIN_CODE;
            chunk[i] = isLessThanMin ? LOWER_MAX_CODE - (Math.abs(LOWER_MIN_CODE - chunk[i] + shift)) + 1 : chunk[i] - shift;
        } else if (chunk[i] >= UPPER_MIN_CODE && chunk[i] <= UPPER_MAX_CODE) {
            const isLessThanMin = chunk[i] - shift < UPPER_MIN_CODE;
            chunk[i] = isLessThanMin ? UPPER_MAX_CODE - (Math.abs(UPPER_MIN_CODE - chunk[i] + shift)) + 1 : chunk[i] - shift;
        }
    }
}

function generateTransform(action, shift) {
    return function(chunk, _, callback) {
        switch (action) {
            case ENCODE_ACTION: {
                if (shift >= 0) {
                    encode(chunk, Math.abs(Number(shift) % 25));
                } else {
                    decode(chunk, Math.abs(Number(shift) % 25));
                }
                break;
            }
            case DECODE_ACTION: {
                if (shift >= 0) {
                    decode(chunk, Math.abs(Number(shift) % 25));
                } else {
                    encode(chunk, Math.abs(Number(shift) % 25));
                }
                break;
            }
            default: {
                process.stderr.write('It\'s an unknown action');
                process.exit(0);
            }
        }
        this.push(chunk);
        callback();
    }
}

module.exports = {
    generateTransform
};