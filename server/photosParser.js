const fs = require('fs');
// const { parse } = require("csv-parse");
const path = require('path');
const { parse, format } = require('fast-csv');

const inputFile = path.join(__dirname, '../rawData/photos.csv');
const outputFile = path.resolve(__dirname, '../rawdata/transformed_photos.csv');

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
        photo_style_id: row.styleId,
        url: row.url,
        thumbnail_url: row.thumbnail_url
      }
    ))

  fs.createReadStream(inputFile)
    .pipe(parseOpts)
    .pipe(transform)
    .pipe(writeStream);
}());

// PARSE USING CSV-PARSER

// fs.createReadStream('server/skus.csv')
//   .pipe(parse({ delimiter: ",", from_line: 2 }))
//   .on("data", function (row) {
//     console.log(row);
//   })

// PARSE USING csvToArray FUNCTION

// function csvToArray(str, delimiter = ",") {

//   // slice from start of text to the first \n index
//   // use split to create an array from string by delimiter
//   const headers = str.slice(0, str.indexOf("\n")).split(delimiter);

//   // slice from \n index + 1 to the end of the text
//   // use split to create an array of each csv value row
//   const rows = str.slice(str.indexOf("\n") + 1).split("\n");

//   // Map the rows
//   // split values from each row into an array
//   // use headers.reduce to create an object
//   // object properties derived from headers:values
//   // the object passed as an element of the array
//   const arr = rows.map(function (row) {
//     const values = row.split(delimiter);
//     const el = headers.reduce(function (object, header, index) {
//       object[header] = values[index];
//       return object;
//     }, {});
//     return el;
//   });

//   // return the array
//   return arr;
// }

// fs.createReadStream('server/features.csv')
//   // .pipe(csvToArray())
//   .on("data", function (row) {
//     console.log(csvToArray(row.toString()));
//   })

