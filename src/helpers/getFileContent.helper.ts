import { createReadStream } from 'fs';
import events from 'node:events';
import readline from 'readline';

const getFileContent = async (filePath: string) => {
  const input = createReadStream(filePath);
  const rl = readline.createInterface({ input });

  const lines: string[] = [];
  rl.on('line', input => {
    lines.push(input);
  });

  await events.once(rl, 'close');

  return lines;
};

export default getFileContent;
