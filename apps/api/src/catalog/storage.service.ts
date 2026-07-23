import { Injectable } from '@nestjs/common';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { randomUUID } from 'crypto';

@Injectable()
export class StorageService {
  private readonly bucket = process.env.S3_BUCKET ?? 'produtos';
  private readonly client = new S3Client({
    endpoint: process.env.S3_ENDPOINT ?? 'http://localhost:9000', region: process.env.S3_REGION ?? 'us-east-1',
    forcePathStyle: true, credentials: { accessKeyId: process.env.S3_ACCESS_KEY ?? 'minioadmin', secretAccessKey: process.env.S3_SECRET_KEY ?? 'minioadmin' },
  });
  async upload(file: Express.Multer.File) {
    const key = `products/${randomUUID()}-${file.originalname.replace(/[^a-zA-Z0-9._-]/g, '-')}`;
    await this.client.send(new PutObjectCommand({ Bucket: this.bucket, Key: key, Body: file.buffer, ContentType: file.mimetype }));
    const baseUrl = process.env.S3_PUBLIC_URL ?? 'http://localhost:9000/produtos';
    return { key, url: `${baseUrl}/${key}` };
  }
}
