import { DataSource } from 'typeorm';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';

export const TestDataSource = new DataSource({
  type: 'sqlite',
  database: ':memory:',  // Use in-memory SQLite database for testing
  entities: [User, Report],
  synchronize: true,     // Automatically create schema
  dropSchema: true,      // Drop schema before each test run
});
