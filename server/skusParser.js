const fs = require('fs');
// const { parse } = require("csv-parse");
const path = require('path');
const { parse, format } = require('fast-csv');

const inputFile = path.join(__dirname, '../rawData/skus.csv');
const outputFile = path.resolve(__dirname, '../rawdata/transformed_skus.csv');

// PARSE USING FAST-CSV

(async function transformCsv() {
  const writeStream = fs.createWriteStream(outputFile);

  const parseOpts = parse({
    ignoreEmpty: true,
    discardUnmappedColumns: true,
    headers: true,
  });

  const transform = format({ headers: true, quote: false })
    .transform((row) => (
      {
        id: row.id,
        sku_style_id: row.styleId,
        size: row.size,
        quantity: row.quantity
      }
    ))

  fs.createReadStream(inputFile)
    .pipe(parseOpts)
    .pipe(transform)
    .pipe(writeStream);
}());