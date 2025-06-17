import { AppDataSource } from './data-source';

export const appDataSourceProvider = {
  provide: 'APP_DATA_SOURCE',
  useFactory: async () => {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    return AppDataSource;
  },
};