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
/**
 *
 * @param coverage
 * @returns {{content: string, LF: Number, LH: number}}
 */
function toLcovContent(coverage) {
    // first always `null` that is ignored
    const coverageWithoutFirst = coverage.slice(1);

    // content
    let MissedLineCount = 0;
    const content = coverageWithoutFirst.map((value, index) => {
        const lineNumber = index + 1;
        if (value == null) {// null or false , 0
            MissedLineCount++;
            return `DA:${lineNumber},0`
        }
        if (typeof value === "number") {
            const intValue = Math.round(value);
            if (intValue <= 0) {
                MissedLineCount++;
            }
            return `DA:${lineNumber},${intValue}`;
        }
        // other
        if (value) {
            return `DA:${lineNumber},1`;
        }
    }).join("\n");
    // summary
    // LF:<number of instrumented lines> = total line numbers
    // LH:<number of lines with a non-zero execution count> = non-error line numers
    const LF = coverageWithoutFirst.length;
    const LH = MissedLineCount;
    return {
        content,
        LF,
        LH
    }
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
        const contentResult = toLcovContent(coverageOfFile);
        output += "\n";
        output += "SF:" + filePath + "\n";
        output += contentResult.content + "\n";
        output += "LF:" + contentResult.LF + "\n";
        output += "LH:" + contentResult.LH + "\n";
        output += "end_of_record\n";
    });
    return output.trim();
}