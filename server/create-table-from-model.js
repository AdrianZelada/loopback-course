/*  _______    _        _
 ** |__   __|  | |      | |
 **    | |_   _| |_ __ _| |_ ___  _ __
 **    | | | | | __/ _` | __/ _ \| '__|
 **    | | |_| | || (_| | || (_) | |
 **    |_|\__,_|\__\__,_|\__\___/|_|
 **-----All copyrights----------
 */
const readline = require('readline');
const server = require('./server');

const ds = server.dataSources.mysqlDs;

if (ds) {
  const rl = readline.createInterface(process.stdin, process.stdout);
  rl.setPrompt('Enter Loopback Model name > ');
  rl.prompt();

  rl.on('line', (model) => {
    const temp = [model];
    ds.automigrate(temp, (error) => {
      if (error) {
        console.error(error);
      } else {
        console.log(`Winners don't use drugs!, with this you cheated ${Math.floor(Math.random() * (60 - 1 + 1) + 1)} minutes of your life!!`);
      }

      ds.disconnect();
      process.exit(0);
    });
  });
} else {
  console.log('invalid dataSource memelas is angry >:v');
  process.exit(0);
}
