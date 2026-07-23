import type { Category, Product } from './types';
const baseUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api';
const request = async <T,>(path: string, options: RequestInit = {}, token?: string): Promise<T> => {
  const response = await fetch(`${baseUrl}${path}`, { ...options, headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}), ...options.headers } });
  if (!response.ok) throw new Error((await response.json().catch(() => ({ message: 'Não foi possível concluir a operação.' }))).message);
  return response.status === 204 ? undefined as T : response.json();
};
export const api = {
  categories: () => request<Category[]>('/categories'), products: (category?: string) => request<Product[]>(`/products${category ? `?category=${category}` : ''}`), product: (slug: string) => request<Product>(`/products/${slug}`),
  login: (email: string, password: string) => request<{ accessToken: string }>('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  adminCategories: (token: string) => request<Category[]>('/admin/categories', {}, token), adminProducts: (token: string) => request<Product[]>('/admin/products', {}, token),
  saveCategory: (data: Pick<Category, 'name' | 'slug'>, token: string, id?: string) => request<Category>(`/admin/categories${id ? `/${id}` : ''}`, { method: id ? 'PUT' : 'POST', body: JSON.stringify(data) }, token),
  deleteCategory: (id: string, token: string) => request<void>(`/admin/categories/${id}`, { method: 'DELETE' }, token),
  saveProduct: (data: Omit<Product, 'id' | 'category' | 'images'>, token: string, id?: string) => request<Product>(`/admin/products${id ? `/${id}` : ''}`, { method: id ? 'PUT' : 'POST', body: JSON.stringify(data) }, token),
  deleteProduct: (id: string, token: string) => request<void>(`/admin/products/${id}`, { method: 'DELETE' }, token),
  async uploadImage(productId: string, file: File, token: string) { const body = new FormData(); body.append('file', file); const response = await fetch(`${baseUrl}/admin/products/${productId}/images`, { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body }); if (!response.ok) throw new Error('Não foi possível enviar a imagem.'); return response.json(); },
};
