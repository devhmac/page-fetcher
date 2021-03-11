// use process.argv to take argument 
const cliArg = process.argv.slice(2)
//require request npm
const request = require('request')
//require node file system to write file
const fs = require('fs')

request(cliArg[0], (error, response, body) => {
  //console.log('error: ', error);
  //console.log('statusCode: ', response && response.statusCode);
  //console.log('body', body);

  //if error with request, throw
  if (error) throw (`There was an error making the http request, ${error}`)
  //if you get 404'd etc log whats happening
  if (response.statusCode !== 200) console.log('We could not complete your download, your http request Status Code was: ', response && response.statusCode)
  // if the request does not error, and our status code is 200 (good as set by parameters)
  if (!error && response.statusCode === 200) {
    //write body of request to file specified by cli arg, 
    fs.writeFile(cliArg[1], body, (err,) => {
      if (err) {
        //if there is an error with writeFile log it
        console.log(err);
      } else {
        // if no errors writing, get fileStats for file we just created
        fs.stat(cliArg[1], (err, fileStats) => {
          if (err) {
            console.log(err)
          } else {
            //final console.log file was created successfully, and use fileStats.size for byte amount
            console.log(`Downloaded and saved ${fileStats.size} bytes to ${cliArg[1]} `)
          }
        })
        //console.log('File created successfully',);
      }
    })
  }



});