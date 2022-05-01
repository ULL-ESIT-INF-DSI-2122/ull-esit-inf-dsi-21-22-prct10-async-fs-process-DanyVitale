import {spawn} from 'child_process';
import * as fs from 'fs';
import EventEmitter = require('events');
import chalk = require('chalk');

/**
 * @class Wrapper
 * @classdesc Wrapper class descibes the behavior of the wrapper.
 */
export class Wrapper extends EventEmitter {
  /**
   * Contructor of the Wrapper class.
   */
  constructor() {
    super();
  }

  /**
   * isDirectory describes if a path is a directory.
   * @param path is the path to check.
   */
  isDirectory(path: string): void {
    if (fs.existsSync(path)) {
      const stat = fs.statSync(path);
      if (stat.isDirectory()) {
        console.log(chalk.green(`${path} is a directory`));
      } else {
        console.log(chalk.red(`${path} is not a directory`));
      }
    } else {
      console.log(chalk.red(`${path} does not exist`));
    }
  }

  /**
   * createDirectory creates a directory.
   * @param path is the path to check.
   */
  createDirectory(path: string): void {
    if (!fs.existsSync(path)) {
      fs.mkdir(path, (err) => {
        if (err) {
          console.log(chalk.red(`Error: ${err}`));
        } else {
          console.log(chalk.green(`Directory created`));
        }
      });
    } else {
      console.log(chalk.red(`Directory already exists`));
    }
  }

  /**
   * listFiles lists the files in a directory.
   * @param path is the path to check.
   */
  listFiles(path: string): void {
    const files = spawn('ls', [path]);
    files.stdout.on('data', (data) => {
      console.log(data.toString());
    });
  }

  /**
   * showFile shows the content of a file.
   * @param path is the path to check.
   */
  showFile(path: string): void {
    const file = spawn('cat', [path]);
    file.stdout.on('data', (data) => {
      console.log(data.toString());
    });
  }

  /**
   * moveFile moves a file.
   * @param path is the path to check.
   * @param path2 is the path to check.
   */
  moveFile(path: string, path2: string): void {
    if (fs.existsSync(path)) {
      fs.rename(path, path2, (err) => {
        if (err) {
          console.log(chalk.red(`Error: ${err}`));
        } else {
          console.log(chalk.green(`File moved`));
        }
      });
    } else {
      console.log(chalk.red(`File does not exist`));
    }
  }
}
