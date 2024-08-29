import fs from 'fs';
// @ts-ignore
import dataFilePath from './data_file_path.js';
import {Context} from '../commands/command';

const savePersistentData = (context: Context) => {
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
};

export default savePersistentData;
