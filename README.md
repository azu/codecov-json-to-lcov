# codecov-json-to-lcov [![Build Status](https://travis-ci.org/azu/codecov-json-to-lcov.svg?branch=master)](https://travis-ci.org/azu/codecov-json-to-lcov)

Convert [Codecov JSON](https://gist.github.com/codecov-io/96e1addb96856a9034c2 "Codecov JSON") format to [lcov](http://ltp.sourceforge.net/coverage/lcov/geninfo.1.php) format. 

- [Codecov - Code Coverage](https://codecov.io/ "Codecov - Code Coverage")

## Installation

     npm install codecov-json-to-lcov

## Usage

```js
import toLcov from "codecov-json-to-lcov";
const codecovJSON = require("./fixtures/codecov.json");
toLcov(codecovJSON);
/*
lcov format
*/
```

### Example

Convert codecov json:

```json
{
    "coverage": {
        "path/to/file.py": [null, 1, 0, null, true, 0, 0, 1, 1],
        "path/to/other.py": [null, 0, 1, 1, "1/3", null]
    },
    "messages": {
        "path/to/other.py": {
            "1": "custom message for line 1"
        }
    }
}
```

to lcov

```
SF:path/to/file.py
DA:1,1
DA:2,0
DA:3,0
DA:4,1
DA:5,0
DA:6,0
DA:7,1
DA:8,1
LF:8
LH:4
end_of_record

SF:path/to/other.py
DA:1,0
DA:2,1
DA:3,1
DA:4,1
DA:5,0
LF:5
LH:3
end_of_record
```

## Tests

    npm test

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

MIT