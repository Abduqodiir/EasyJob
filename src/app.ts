import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { appConfig } from '@config';
import { Application, ApplicationsModule, AuthModule, FileModule, Job, JobModule, MailModule, Resume, ResumeModule, Token, User, UserModule} from '@modules';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      serveRoot: "/uploads",
      rootPath: "./uploads"
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        synchronize: true,
        autoLoadEntities: true,
        dropSchema: true,
        entities: [User, Application, Resume, Job, Token]
      }),
    }),
    AuthModule,
    FileModule,
    MailModule,
    UserModule,
    JobModule,
    ApplicationsModule,
    ResumeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
