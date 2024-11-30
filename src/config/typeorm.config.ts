import { DataSource } from 'typeorm';
import { config } from 'dotenv';
config();


const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT || '5432'),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  logging: process.env.DATABASE_LOGGING === 'true' || false,
  ssl: process.env.DATABASE_SSL === 'true' || false,
  synchronize: process.env.DATABASE_SYNCHRONIZE === 'true' || false,
  entities: ['dist/database/entities/*.entity{.js,.ts}'],
  migrations: ['dist/database/migrations/*.js'],
  migrationsRun: false,
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized successfully!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });

export default AppDataSource;
