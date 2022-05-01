import {EventEmitter} from 'events';
import {spawn} from 'child_process';
import {access} from 'fs';

export class FindWord extends EventEmitter {
  constructor() {
    super();
  }

  /**
   * findwithPipe() - Find a word in a file with a pipe
   * @param fileName File name.
   * @param word Word to find.
   */
  findWithPipe(fileName: string, word: string): void {
    access(fileName, (err) => {
      if (err) {
        this.emit('error', err);
      } else {
        const grep = (spawn('grep', [word, fileName]));
        const wc = (spawn('wc', ['-l']));
        grep.stdout.pipe(wc.stdin);
        wc.stdout.on('data', (data) => {
          const count = parseInt(data.toString(), 10);
          console.log(`The word "${word}" appears ${count} times in the file "${fileName}"`);
        });
      }
    });
  }

  /**
  * find() - Find a word in a file without a pipe
  * @param fileName File name.
  * @param word Word to find.
  */
  findWithoutPipe(fileName: string, word: string): void {
    access(fileName, (err) => {
      if (err) {
        this.emit('error', err);
      } else {
        const grep = spawn('grep', [word, fileName]);
        const wc = spawn('wc', ['-l']);
        grep.stdout.on('data', (data) => {
          wc.stdin.write(data);
        });
        wc.stdout.on('data', (data) => {
          const count = parseInt(data.toString(), 10);
          console.log(`The word "${word}" appears ${count} times in the file "${fileName}"`);
        });
      }
    });
  }
}
