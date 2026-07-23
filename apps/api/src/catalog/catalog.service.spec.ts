import assert from 'node:assert/strict';
import test from 'node:test';
import { CatalogService } from './catalog.service';

test('lists only published products in the public catalog', async () => {
  const calls: unknown[] = [];
  const prisma = { product: { findMany: (input: unknown) => { calls.push(input); return Promise.resolve([]); } } } as any;
    const service = new CatalogService(prisma);
    await service.publicProducts();
    assert.deepEqual((calls[0] as { where: unknown }).where, { isPublished: true });
});
