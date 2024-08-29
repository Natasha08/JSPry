const fs = require('fs');
const dataFilePath = require('./data_file_path');

// Function to save the current context to the file
function savePersistentData(context) {
  const cache = new Set();
  const data = JSON.stringify(context, (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (cache.has(value)) {
        return; // Circular reference found, discard key
      }
      cache.add(value);
    }
    return value;
  }, 2);
  fs.writeFileSync(dataFilePath, data);
  cache.clear();
}

module.exports = savePersistentData;
