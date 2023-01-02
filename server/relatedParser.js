const fs = require('fs');
// const { parse } = require("csv-parse");
const path = require('path');
const { parse, format } = require('fast-csv');

const inputFile = path.join(__dirname, '../rawData/related.csv');
const outputFile = path.resolve(__dirname, '../rawdata/transformed_related.csv');

// PARSE USING FAST-CSV

(async function transformCsv() {
  const writeStream = fs.createWriteStream(outputFile);

  const parseOpts = parse({
    ignoreEmpty: true,
    discardUnmappedColumns: true,
    headers: true,
  })
    // added to take care of issue with related_product_id being 0 which is not valid when copying over the data to the DB
    .validate(data => data.related_product_id !== '0')
    .on('error', error => console.error(error))
    .on('data-invalid', (row, rowNumber) => console.log(`Invalid [rowNumber=${rowNumber}] [row=${JSON.stringify(row)}]`))
    .on('end', rowCount => console.log(`Parsed ${rowCount} rows`));

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