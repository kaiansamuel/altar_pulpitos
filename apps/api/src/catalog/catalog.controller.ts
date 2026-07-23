import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CatalogService } from './catalog.service';
import { CategoryDto, ProductDto } from './dtos';
import { StorageService } from './storage.service';

@Controller()
export class CatalogController {
  constructor(private readonly catalog: CatalogService, private readonly storage: StorageService) {}

  @Get('categories') categories() { return this.catalog.categories(); }
  @Get('products') products(@Query('category') category?: string) { return this.catalog.publicProducts(category); }
  @Get('products/:slug') product(@Param('slug') slug: string) { return this.catalog.publicProduct(slug); }

  @UseGuards(JwtAuthGuard)
  @Get('admin/categories') adminCategories() { return this.catalog.categories(); }
  @UseGuards(JwtAuthGuard)
  @Post('admin/categories') createCategory(@Body() body: CategoryDto) { return this.catalog.createCategory(body); }
  @UseGuards(JwtAuthGuard)
  @Put('admin/categories/:id') updateCategory(@Param('id') id: string, @Body() body: CategoryDto) { return this.catalog.updateCategory(id, body); }
  @UseGuards(JwtAuthGuard)
  @Delete('admin/categories/:id') deleteCategory(@Param('id') id: string) { return this.catalog.deleteCategory(id); }

  @UseGuards(JwtAuthGuard)
  @Get('admin/products') adminProducts() { return this.catalog.products(); }
  @UseGuards(JwtAuthGuard)
  @Post('admin/products') createProduct(@Body() body: ProductDto) { return this.catalog.createProduct(body); }
  @UseGuards(JwtAuthGuard)
  @Put('admin/products/:id') updateProduct(@Param('id') id: string, @Body() body: ProductDto) { return this.catalog.updateProduct(id, body); }
  @UseGuards(JwtAuthGuard)
  @Delete('admin/products/:id') deleteProduct(@Param('id') id: string) { return this.catalog.deleteProduct(id); }

  @UseGuards(JwtAuthGuard)
  @Post('admin/products/:id/images')
  @UseInterceptors(FileInterceptor('file', { limits: { fileSize: 5 * 1024 * 1024 }, fileFilter: (_req, file, done) => done(null, file.mimetype.startsWith('image/')) }))
  async uploadImage(@Param('id') id: string, @UploadedFile() file?: Express.Multer.File) {
    if (!file) throw new BadRequestException('Envie uma imagem de até 5 MB.');
    const uploaded = await this.storage.upload(file);
    return this.catalog.addImage(id, { ...uploaded, alt: file.originalname });
  }
  @UseGuards(JwtAuthGuard)
  @Delete('admin/images/:id') deleteImage(@Param('id') id: string) { return this.catalog.deleteImage(id); }
}
