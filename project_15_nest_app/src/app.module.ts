import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule} from '@nestjs/serve-static';
import { join } from 'node:path';
import { UsersModule } from './users/users.module';
import { RolesModule} from './roles/roles.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy} from 'typeorm-naming-strategies';
import { AuthModule } from './auth/auth.module';
import { config } from 'dotenv';

config();
const configService = new ConfigService();

const configParams = {
  isGlobal: true,
  envFilePath: ['.env'],
};

const staticDirConfig = {
  rootPath: join(__dirname, '..', 'client', 'dir'),
  exclude: ['/api*']  //добавляем адрес в исключение, чтобы при запросе на апи модуль не реагировал на этот адрес.
}

const ormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: configService.get('NODEAPP_HOST', 'localhost'),
  port: configService.get('NODEAPP_PORT', 5432),
  username: configService.get('NODEAPP_USER', 'user'),
  password: configService.get('NODEAPP_PASS', '123456'),
  database: configService.get('NODEAPP_DB', 'db'),
  entities: [join(__dirname, '**', '*.entity{.ts,.js}')],
  synchronize: true,
  namingStrategy: new SnakeNamingStrategy(),
}
@Module({
  imports: [
    ConfigModule.forRoot(configParams),
    ServeStaticModule.forRoot(staticDirConfig),
    TypeOrmModule.forRoot(ormConfig),
    UsersModule,
    RolesModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
