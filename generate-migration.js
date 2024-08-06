const { execSync } = require('child_process');
const migrationName = process.argv[2];

if (!migrationName) {
  console.error('Please provide a migration name.');
  process.exit(1);
}

const command = `npx typeorm migration:generate src/migrations/${migrationName} -d ./data-source.js -o`;

try {
  execSync(command, { stdio: 'inherit' });
} catch (error) {
  console.error('Error generating migration:', error);
  process.exit(1);
}