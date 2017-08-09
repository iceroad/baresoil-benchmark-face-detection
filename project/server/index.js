process.exit(require('child_process').spawnSync('python driver.py', {
  stdio: 'inherit',
  shell: true,
}).status);
