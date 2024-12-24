import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: 'mongodb+srv://vishalweb:VishalWeb@cluster0.ly2xbhb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
        connectionFactory: (connection) => {
          const logger = new Logger('MongoDB');
          logger.log(`Connection state: ${connection.readyState}`); // Log the initial state

          // Attach event listeners
          connection.on('connected', () => {
            logger.log('Mongoose connected to the database.');
          });

          connection.on('error', (error) => {
            logger.error(`Mongoose connection error: ${error}`);
          });

          connection.on('disconnected', () => {
            logger.warn('Mongoose disconnected from the database.');
          });

          // If already connected, log manually
          if (connection.readyState === 1) {
            logger.log('Mongoose already connected to the database.');
          }
          return connection;
        },
      }),
    }),
  ],
})
export class MongoDbModule {}
