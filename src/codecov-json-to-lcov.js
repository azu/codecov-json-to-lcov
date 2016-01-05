/*
https://gist.github.com/codecov-io/96e1addb96856a9034c2
to
http://ltp.sourceforge.net/coverage/lcov/geninfo.1.php
*/

/**
 *
 * @param coverage
 * @returns {string} lcov part string
 *
 * ```
 * DA:1,1
 * ....
 * DA:42,1
 * ```
 *
 * - not contain `SF`
 * - not contain `end_of_record`
 */
function toLcovContent(coverage) {
    // first always `null` that is ignored
    const coverageWithoutFirst = coverage.slice(1);
    return coverageWithoutFirst.map((value, index) => {
        const lineNumber = index + 1;
        if (value == null) {
            return `DA:${lineNumber},0`
        }
        if (typeof value === "number") {
            const intValue = Math.round(value);
            return `DA:${lineNumber},${intValue}`;
        }
        // other
        if (value) {
            return `DA:${lineNumber},1`;
        }
    }).join("\n");
}
/**
 * Convert codecov json to lcov string
 * @param {object} codecov
 * @returns {string}
 */
export default function toLcov(codecov) {
    if (!codecov["coverage"]) {
        throw new Error("1st arguments is not Codecov object: " + codecov);
    }
    let output = "";
    const coverage = codecov["coverage"];
    Object.keys(coverage).forEach(filePath => {
        const coverageOfFile = coverage[filePath];
        output += "\n";
        output += "SF:" + filePath + "\n";
        output += toLcovContent(coverageOfFile);
        output += "\n";
    });
    output = output.trim() + "\n"+ "end_of_record";
    return output;
}