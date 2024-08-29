import {Context} from '../commands/command';

export default function safeAssign(target: Context, source: Context) {
  for (let key in source) {
    if (source.hasOwnProperty(key)) {
      try {
        target[key] = source[key];
      } catch (error: any) {
        console.warn(`Skipping ${key}:`, error.message);
      }
    }
  }
}
