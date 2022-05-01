import {watch, createReadStream} from 'fs';
import * as readline from 'readline';
import yargs from 'yargs';
import chalk from 'chalk';

if (process.argv.length !== 4) {
  console.log('Usage: node dist/Ejercicio-3/ejercicio-3.js option <path>');
  process.exit(1);
}

/**
 * @function watchFile - Watch a file and emit an event when the file is changed
 */
export function watchFile(path: string): void {
  watch(path, (eventType, filename) => {
    if (eventType === 'change') {
      console.log(chalk.green(`File ${filename} changed`));
      readFile(path);
    } else if (eventType === 'rename') {
      console.log(chalk.green(`File ${filename} renamed`));
      readFile(path);
    } else if (eventType === 'delete') {
      console.log(chalk.green(`File ${filename} deleted`));
      readFile(path);
    }
  });
}

/**
 * @function readFile - Read a file and emit an event when the file is read
 * @param path Path to the file
 */
export function readFile(path: string): void {
  console.log(chalk.blue('Reading file...'));
  const readStream = createReadStream(path);
  const rl = readline.createInterface({
    input: readStream,
  });

  rl.on('line', (line) => {
    console.log(chalk.blue('Line: ' + line));
  });

  rl.on('close', () => {
    console.log(chalk.blue('File read'));
  });
}

/**
 * getUser - Get the user from the command line
 * @param path is the path to the file
 * @returns user input
 */
export function getUser(path: string) {
  console.log('Getting user...');
  const user = path.split('/')[2];
  console.log(chalk.blue(`User: ${user}`));
  return user;
}

/**
 * watchDirectory - Watch a directory and emit an event when the directory is changed
 * @param path is the path to the file
 */
export function watchDirectory(path: string): void {
  const user = getUser(path);
  watch(path, (eventType, filename) => {
    if (eventType === 'change') {
      console.log(chalk.green(`File ${filename} changed by ${user}`));
      readFile(path + '/' + filename);
    } else if (eventType === 'rename') {
      console.log(chalk.green(`File ${filename} renamed by ${user}`));
      readFile(path + '/' + filename);
    } else if (eventType === 'delete') {
      console.log(chalk.green(`File ${filename} deleted by ${user}`));
      readFile(path + '/' + filename);
    } else if (eventType === 'add') {
      console.log(chalk.green(`File ${filename} added by ${user}`));
      readFile(path + '/' + filename);
    } else {
      console.log(chalk.red(`Error: ${eventType}`));
    }
  });
}

yargs.command({
  command: 'watch',
  describe: 'Watch a file',
  builder: {
    path: {
      describe: 'Path to the file',
      demandOption: true,
      type: 'string',
    },
  },
  handler: (argv: any) => {
    if (typeof argv.path === 'string') {
      watchFile(argv.path);
    } else {
      console.log(chalk.red(Error));
    }
  },
}).command({
  command: 'watchAll',
  describe: 'Watch all files',
  builder: {
    path: {
      describe: 'Path to the file',
      demandOption: true,
      type: 'string',
    },
  },
  handler: (argv: any) => {
    if (typeof argv.path === 'string') {
      watchDirectory(argv.path);
    } else {
      console.log(chalk.red(Error));
    }
  },
}).parse();
