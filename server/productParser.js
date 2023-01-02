const fs = require('fs');
// const { parse } = require("csv-parse");
const path = require('path');
const { parse, format } = require('fast-csv');

const inputFile = path.join(__dirname, '../rawData/related.csv');
const outputFile = path.resolve(__dirname, '../rawdata/transformed_related.csv');

// PARSE USING FAST-CSV

(async function transformCsv() {
  // var count = 0;
  // var counter = () => {
  //   console.log(count);
  //   count++;
  // }
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
        current_product_id: row.current_product_id,
        related_product_id: row.related_product_id
      }
    ))

  fs.createReadStream(inputFile)
    .pipe(parseOpts)
    .pipe(transform)
    .pipe(writeStream);
}());