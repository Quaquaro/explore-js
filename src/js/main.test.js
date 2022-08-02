import { getProducts } from './main.js';
import axios from 'axios';
import { expect, vi } from 'vitest';

vi.mock('axios', () => {
  return {
    default: {
      get: vi.fn()
    }
  };
});

const mockData = [
  { name: 'product_name 1', price: 5, id: 0 },
  { name: 'product_name 2', price: 10, id: 1 },
  { name: 'product_name 3', price: 15, id: 2 }
];

test('fn getProducts() should request api with axios.get', async () => {
  const spyAxios = vi.spyOn(axios, 'get');
  await getProducts();
  expect(spyAxios).toHaveBeenCalledWith('https://api.test-domain.de/products');
});

test('fn getProducts() should return data from api', async () => {
  axios.get.mockResolvedValue({ status: 200, data: mockData });
  expect(await getProducts()).toStrictEqual(mockData);
});

test('fn getProducts() should return string if there are no products', async () => {
  axios.get.mockResolvedValue({ status: 404, data: [] });
  expect(await getProducts()).toBe('keine Daten');
});
