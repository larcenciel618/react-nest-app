import { Module } from '@nestjs/common';
import { ItemModule } from './item/item.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './data-source';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ItemModule,
    UserModule,
    TypeOrmModule.forRoot(AppDataSource.options),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

//migration command
// yarn typeorm-ts-node-commonjs migration:generate src/migration/add-column-email-password-to-user -d src/data-source.ts
