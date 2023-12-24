const carbone = require('carbone');
const fs = require('fs');
const { exec } = require('child_process');

var data = {
    firstname : 'John',
    lastname : 'Doe'
  };

  var options = {
    convertTo : 'pdf' //can be docx, txt, ...
  };

  exec('libreoffice --convert-to pdf ./node_modules/carbone/examples/simple.odt', (err, stdout, stderr) => {
      if (err) {
          console.error(`exec error: ${err}`);
          return;
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
  });
  
//   carbone.render('./node_modules/carbone/examples/simple.odt', data, options, function(err, result){
//     if (err) return console.log(err);
//     fs.writeFileSync('result.pdf', result);
//     process.exit(); // to kill automatically LibreOffice workers
//   });

// carbone.render('./node_modules/carbone/examples/simple.odt', data, options, function(err, result){
//     if (err) {
//       return console.error(err);
//     }
//     fs.writeFileSync('result.pdf', result);
//     console.log('File was converted successfully');
// });
