// use process.argv to take argument 
const cliArg = process.argv.slice(2)
//require request npm
const request = require('request')
//require node file system to write file
const fs = require('fs')

request(cliArg[0], (error, response, body) => {
  console.log('error completing http request: ', error);
  // console.log('headers: ', headers.size)
  //console.log('statusCode: ', response && response.statusCode);
  //console.log('body', body);

  fs.writeFile(cliArg[1], body, (bytesWritten, err,) => {
    if (err) throw err;

    if (!err) console.log('File created successfully', bytesWritten);

  })

  //if (error !== null) console.log('WOAH ERRORROROROR')
});