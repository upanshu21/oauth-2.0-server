import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Item, ItemSchema } from './model/schema';
import { ItemController } from './model/controller';
import { ItemService } from './model/service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './auth/user.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/myFirstDatabase'),
    MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }]),
    AuthModule,
    UserModule,
  ],
  controllers: [AppController, ItemController],
  providers: [ItemService],
})
export class AppModule {}
