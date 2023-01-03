const fs = require('fs');
// const { parse } = require("csv-parse");
const path = require('path');
const { parse, format } = require('fast-csv');

const inputFile = path.join(__dirname, '../../rawData/product.csv');
const outputFile = path.resolve(__dirname, '../../rawdata/transformed_product.csv');

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
        product_id: row.id,
        name: row.name,
        slogan: row.slogan,
        description: row.description,
        category: row.category,
        default_price: row.default_price
      }
    ))

  fs.createReadStream(inputFile)
    .pipe(parseOpts)
    .pipe(transform)
    .pipe(writeStream);
}());