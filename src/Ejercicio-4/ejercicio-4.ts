import yargs from 'yargs';
import {Wrapper} from './wrapper';
import chalk from 'chalk';

yargs.command({
  command: 'isDirectory',
  describe: 'Checks if a path is a directory',
  builder: {
    path: {
      describe: 'Path to check',
      demandOption: true,
      type: 'string',
    },
  },
  handler: (argv: any) => {
    if (typeof argv.path === 'string') {
      const wrapper = new Wrapper();
      wrapper.isDirectory(argv.path);
    } else {
      console.log(chalk.red(Error));
    }
  },
}).command({
  command: 'createDir',
  describe: 'Creates a directory',
  builder: {
    path: {
      describe: 'Path to create',
      demandOption: true,
      type: 'string',
    },
  },
  handler: (argv: any) => {
    if (typeof argv.path === 'string') {
      const wrapper = new Wrapper();
      wrapper.createDirectory(argv.path);
    } else {
      console.log(chalk.red(Error));
    }
  },
}).command({
  command: 'list',
  describe: 'Lists the files in a directory',
  builder: {
    path: {
      describe: 'Path to list',
      demandOption: true,
      type: 'string',
    },
  },
  handler: (argv: any) => {
    if (typeof argv.path === 'string') {
      const wrapper = new Wrapper();
      wrapper.listFiles(argv.path);
    } else {
      console.log(chalk.red(Error));
    }
  },
}).command({
  command: 'move',
  describe: 'Moves a file',
  builder: {
    path: {
      describe: 'Path to move',
      demandOption: true,
      type: 'string',
    },
    newPath: {
      describe: 'New path',
      demandOption: true,
      type: 'string',
    },
  },
  handler: (argv: any) => {
    if (typeof argv.path === 'string' && typeof argv.newPath === 'string') {
      const wrapper = new Wrapper();
      wrapper.moveFile(argv.path, argv.newPath);
    } else {
      console.log(chalk.red(Error));
    }
  },
}).parse();

