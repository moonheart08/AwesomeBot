const test = require('tape');
const TheAwesomeBot = require('../TheAwesomeBot');

const token = process.env.DISCORD_TOKEN || require('../tokens.json').discord; // eslint-disable-line global-require

/*
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
*/

test('connect & disconnect', (t) => {
  t.timeoutAfter(15000);
  t.ok(token, 'discord token should be set');

  const bot = new TheAwesomeBot(token);
  t.false(bot.isReady, 'bot should not be ready');
  bot.init();
  const si = setInterval(() => {
    if (!bot.isReady) {
      t.comment('Waiting connection...');
    } else {
      t.comment('Bot connected');
      t.assert(bot.isReady, 'bot should be ready');
      bot.deinit().then(() => {
        t.comment('Bot disconnected');
        clearInterval(si);
        t.end();
      });
    }
  }, 5000);
});
