import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { CatalogController } from './catalog.controller';
import { CatalogService } from './catalog.service';
import { StorageService } from './storage.service';

@Module({ imports: [AuthModule], controllers: [CatalogController], providers: [CatalogService, StorageService] })
export class CatalogModule {}
