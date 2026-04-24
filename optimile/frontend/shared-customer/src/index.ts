
import { z } from 'zod';

export const statusSchema = z.enum(['NEW','IN_PROGRESS','COMPLETED','PENDING','ACTIVE']);
export type Status = z.infer<typeof statusSchema>;

export const customerFixture = Array.from({ length: 25 }).map((_, i) => ({
  id: 'customer-' + (i + 1),
  name: 'Customer Item ' + (i + 1),
  status: ['NEW','IN_PROGRESS','COMPLETED','PENDING','ACTIVE'][i % 5] as Status,
}));

export const paged = <T,>(content: T[], page = 0, size = 20) => {
  const start = page * size;
  const slice = content.slice(start, start + size);
  return { content: slice, page, size, totalElements: content.length, totalPages: Math.ceil(content.length / size), first: page === 0, last: start + size >= content.length };
};
