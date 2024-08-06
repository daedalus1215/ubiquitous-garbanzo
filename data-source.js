const path = require('path');
const tsNode = require('ts-node');

tsNode.register({
  transpileOnly: true,
  compilerOptions: {
    module: 'commonjs'
  }
});

const dataSourcePath = path.resolve(__dirname, 'src/data-source.ts');
console.log('DataSource Path:', dataSourcePath);

try {
  const { AppDataSource } = require(dataSourcePath);
  module.exports = AppDataSource;
} catch (error) {
  console.error('Error loading AppDataSource:', error);
  throw error;
}
