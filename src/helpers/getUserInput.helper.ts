import * as readline from 'readline';

const getUserInput = async (question: string) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const ask = async () => new Promise<string>(resolve => {
    rl.question(question, resolve);
  });
  const answer = await ask();

  rl.close();

  return answer;
};


export default getUserInput;
