Nest Project.
Need to create 2 files:
* `.env.development` and `.env.test`
* with the values:
  * `DB_NAME={some-db-name-that-is-not-the-same-for-test-development-and-prod.sqlite}` or some other sqlite named file.
  * `COOKIE_KEY={some_random_key}`



# TypeORM migration
1. Run `yarn start` at least once to generate migrations in the `dist/migrations` directory. 
2. If you want to generate data, `yarn migration:run`
2. If you want to generate a new file, replace `{fileName}`: `yarn migration:generate -- {fileName}`