const CARBONE_KEY="test_eyJhbGciOiJFUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI3NTAwMjgwMDAzNzg2NTQ3NTEiLCJhdWQiOiJjYXJib25lIiwiZXhwIjoyMzYxMTI1NTA1LCJkYXRhIjp7InR5cGUiOiJ0ZXN0In19.AECmBMHC2a7aHjjs3Pp-DweJSieqGIHXQtl6zRuh-8HbPfSDayyCZ3mT9oxVIXb9dCRBcnn_cPF8zgifpNhDfnFSAHBsFghhgFTQF6sOrly5-gP7q7Hp9bxdt8ksqaDhJnAasIRby39ktsJhoXE281F9bxgjH9XQcbEG82cHJt5G9_gm";

const carboneSDK = require('carbone-sdk')(CARBONE_KEY);
const fs = require('fs');
const path = require('path');
const util = require('util');
const stream = require('stream');
const { v4: uuidv4 } = require('uuid');

const pipeline = util.promisify(stream.pipeline);

async function generatePdf(data, templatePath, outputPath) {
  try {
    const carboneStream = carboneSDK.render(templatePath, data);
    await pipeline(carboneStream, fs.createWriteStream(outputPath));
    console.log('PDF file has been generated successfully!');
  } catch (err) {
    console.error('Error generating PDF:', err);
  }
}

async function GeneratePdfFile(jsonData, templatePath, outputPath) {
    const data = {
        data: jsonData,
        convertTo: 'pdf'
    };
    await generatePdf(data, templatePath, outputPath);
}

module.exports = GeneratePdfFile;

// const test_data = {
//     firstname: 'John',
//     lastname: 'Doe'
// };

// GeneratePdfFile(test_data);
