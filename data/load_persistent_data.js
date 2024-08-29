const fs = require('fs');
const dataFilePath = require('./data_file_path');

// Function to load the persisted data
function loadPersistentData() {
  if (fs.existsSync(dataFilePath)) {
    const data = fs.readFileSync(dataFilePath, 'utf-8');
    return JSON.parse(data, (key, value) => {
      if (typeof value === 'string' && value.startsWith('function')) {
        return eval(`(${value})`);
      }
      return value;
    });
  }
  return {};
}

module.exports = loadPersistentData;
