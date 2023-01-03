const fs = require('fs');
// const { parse } = require("csv-parse");
const path = require('path');
const { parse, format } = require('fast-csv');

const inputFile = path.join(__dirname, '../../rawData/styles.csv');
const outputFile = path.resolve(__dirname, '../../rawdata/transformed_styles.csv');

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
        style_id: row.id,
        style_product_id: row.productId,
        name: row.name,
        sale_price: row.sale_price,
        original_price: row.original_price === 'null' ? null : `"${row.original_price}"`,
        default_style: row.default_style,
      }
    ))

  fs.createReadStream(inputFile)
    .pipe(parseOpts)
    .pipe(transform)
    .pipe(writeStream);
}());