// file that converts strings to a lowercase hyphenated version
// e.g. Hello World -> hello-world

function hyphenateString(stringInput) {
    return stringInput.replace(' ', '-').toLowerCase();
}

exports.default = hyphenateString;

