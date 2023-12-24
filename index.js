require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const SendEmailWithAttachment = require('./send_email');
const GeneratePdfFile = require('./generate_pdf_file');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies

const reportsDir = path.join(__dirname, 'reports');
const templatesDir = path.join(__dirname, 'templates');

// Check if the reports directory exists, if not, create it
if (!fs.existsSync(reportsDir)){
    fs.mkdirSync(reportsDir, { recursive: true });
}

if (!fs.existsSync(templatesDir)){
  fs.mkdirSync(templatesDir, { recursive: true });
}

app.post('/api/generate-pdf', async (req, res) => {
  try {
    const report_id = req.body.report_id;
    const jsonData = req.body.data; // assuming JSON data is sent in the request body
    const template = req.body.email_requests[0].report_template_file;
    const inputPath = path.join(__dirname, `templates/${template}`);
    const outputPath = path.join(__dirname, `reports/r-${report_id}.pdf`);
    if (fs.existsSync(outputPath)) {
      return res.status(200).send({ output_path: outputPath });
    }
    await GeneratePdfFile(jsonData, inputPath, outputPath);
    res.status(200).send({ output_path: outputPath });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error generating PDF');
  }
});

app.post('/api/send-email', async (req, res) => {
  try {
    const { report_id, data, email_requests, output_path } = req.body;
    const from = process.env.EMAIL_FROM;

    const emailPromises = email_requests.map(email_request => {
      const report_request_id = email_request.report_request_id;
      const to = email_request.email;
      const subject = `${email_request.report_name}: ${data.selected_address}`;
      const text = "Please find attached the report you requested.";
      // Return a promise for each email request
      return SendEmailWithAttachment(from, to, subject, text, output_path)
        .then(result => {
          return { report_id, report_request_id, accepted: result.accepted, rejected: result.rejected };
        });
    });

    // Wait for all the email promises to resolve
    const email_sent = await Promise.all(emailPromises);
    res.status(200).send(email_sent);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error sending email');
  }
});

// Route to check LibreOffice version
app.get('/ping', (req, res) => {
  return res.send('pong');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
