#!/usr/bin/env node
const { login, status } = require('.');
const chalk = require('chalk');

Promise.resolve().then(async () => {
  const { token } = await login();
  const { response: { financiadores } } = await status(token);

  console.log(`👨‍⚕️ Estado plataforma bono electrónico`);
  console.log();

  financiadores.forEach(financiador => {
    const id = financiador.id_asegurador.toString().padEnd(4, ' ');
    const name = financiador.name.padEnd(28, ' ');
    const status = financiador.status.startsWith('a') ? chalk`{green ${financiador.status}}` : chalk`{red ${financiador.status}}`;
    console.log(chalk`{grey ${id}}{yellow ${name}}: ${status}`);
  });

  console.log();
  console.log(`— Jonathan Delgado <hi@jon.soy> (https://jon.soy)`);
  console.log();
  console.log(`REPO: https://github.com/JonDotsoy/imed-health`);
});
