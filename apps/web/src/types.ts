export type Category = { id: string; name: string; slug: string };
export type ProductImage = { id: string; url: string; alt: string; sortOrder: number };
export type Product = { id: string; name: string; slug: string; description: string; dimensions: string; isPublished: boolean; sortOrder: number; categoryId: string; category: Category; images: ProductImage[] };
