import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CategoryDto, ProductDto } from './dtos';

const productInclude = { category: true, images: { orderBy: { sortOrder: 'asc' as const } } };

@Injectable()
export class CatalogService {
  constructor(private readonly prisma: PrismaService) {}
  categories() { return this.prisma.category.findMany({ orderBy: { name: 'asc' } }); }
  createCategory(data: CategoryDto) { return this.prisma.category.create({ data }); }
  updateCategory(id: string, data: CategoryDto) { return this.prisma.category.update({ where: { id }, data }); }
  deleteCategory(id: string) { return this.prisma.category.delete({ where: { id } }); }
  publicProducts(category?: string) { return this.prisma.product.findMany({ where: { isPublished: true, ...(category ? { category: { slug: category } } : {}) }, include: productInclude, orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }] }); }
  async publicProduct(slug: string) {
    const product = await this.prisma.product.findFirst({ where: { slug, isPublished: true }, include: productInclude });
    if (!product) throw new NotFoundException('Produto não encontrado.');
    return product;
  }
  products() { return this.prisma.product.findMany({ include: productInclude, orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }] }); }
  createProduct(data: ProductDto) { return this.prisma.product.create({ data, include: productInclude }); }
  updateProduct(id: string, data: ProductDto) { return this.prisma.product.update({ where: { id }, data, include: productInclude }); }
  deleteProduct(id: string) { return this.prisma.product.delete({ where: { id } }); }
  addImage(productId: string, image: { key: string; url: string; alt: string }) { return this.prisma.productImage.create({ data: { ...image, productId } }); }
  deleteImage(id: string) { return this.prisma.productImage.delete({ where: { id } }); }
}
