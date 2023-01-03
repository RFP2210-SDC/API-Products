const fs = require('fs');
// const { parse } = require("csv-parse");
const path = require('path');
const { parse, format } = require('fast-csv');

const inputFile = path.join(__dirname, '../../rawData/features.csv');
const outputFile = path.resolve(__dirname, '../../rawdata/transformed_features.csv');

// PARSE USING FAST-CSV

(async function transformCsv() {
  const writeStream = fs.createWriteStream(outputFile);

  const parseOpts = parse({
    ignoreEmpty: true,
    discardUnmappedColumns: true,
    headers: true,
  });

  const transform = format({ headers: true, quote: true })
    .transform((row) => (
      {
        id: row.id,
        feature_product_id: row.product_id,
        feature:row.feature,
        value: row.value
      }
    ))

  fs.createReadStream(inputFile)
    .pipe(parseOpts)
    .pipe(transform)
    .pipe(writeStream);
}());