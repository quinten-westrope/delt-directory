const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

app.post('/update-info', (req, res) => {
  const { name, phone, email, major, graduationYear } = req.body;
  const filePath = './updates.txt';

  const entry = `Name: ${name}, Phone: ${phone}, Email: ${email}, Major: ${major}, Graduation Year: ${graduationYear}\n`;

  fs.appendFile(filePath, entry, (err) => {
    if (err) {
      console.error('Error writing to file:', err);
      res.status(500).send('Error updating information');
    } else {
      console.log('Entry added successfully');
      res.status(200).send('Information updated successfully');
    }
  });
});

app.post('/update-alumni', (req, res) => {
  const { name, phone, email } = req.body;
  const filePath = './alumni_updates.txt';

  const entry = `Name: ${name}, Phone: ${phone}, Email: ${email}\n`;

  fs.appendFile(filePath, entry, (err) => {
    if (err) {
      console.error('Error writing to file:', err);
      res.status(500).send('Error updating information');
    } else {
      console.log('Alumni entry added successfully');
      res.status(200).send('Information updated successfully');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});