const csv = require('csv-parser');
const fs = require('fs');
const xlsx = require('xlsx');
const path = require('path');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

exports.ingestData = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const data = [];
    const fileType = file.mimetype;

    if (fileType === 'text/csv') {
      fs.createReadStream(file.path)
        .pipe(csv())
        .on('data', (row) => data.push(row))
        .on('end', () => {
          fs.unlinkSync(file.path); // Clean up the file
          res.status(200).json({
            dataDimensions: {
              rows: data.length,
              columns: data[0] ? Object.keys(data[0]).length : 0
            }
          });
        })
        .on('error', (err) => {
          console.error('Error reading CSV file:', err);
          res.status(500).json({ error: 'Error reading CSV file' });
        });
    } else if (fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      try {
        const workbook = xlsx.readFile(file.path);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const json = xlsx.utils.sheet_to_json(sheet);
        fs.unlinkSync(file.path); // Clean up the file
        res.status(200).json({
          dataDimensions: {
            rows: json.length,
            columns: json[0] ? Object.keys(json[0]).length : 0
          }
        });
      } catch (err) {
        console.error('Error reading XLSX file:', err);
        res.status(500).json({ error: 'Error reading XLSX file' });
      }
    } else {
      fs.unlinkSync(file.path); // Clean up the file
      res.status(400).json({ error: 'Unsupported file type' });
    }
  } catch (error) {
    console.error('Error ingesting data:', error);
    res.status(500).json({ error: 'Error ingesting data' });
  }
};

exports.transformData = async (req, res) => {
  try {
    const { featuresToRemove } = req.body;
    // Perform feature removal and transformation
    res.status(200).json({ message: 'Data transformed successfully' });
  } catch (error) {
    console.error('Error transforming data:', error);
    res.status(500).json({ error: 'Error transforming data' });
  }
};
