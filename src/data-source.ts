import { DataSource } from 'typeorm';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',
  entities: [User, Report],
  migrations: ['dist/migrations/**/*.js'],
  synchronize: false,
});
