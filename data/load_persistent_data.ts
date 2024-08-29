import fs from 'fs';
// @ts-ignore
import dataFilePath from "./data_file_path";

export default function loadPersistentData() {
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
