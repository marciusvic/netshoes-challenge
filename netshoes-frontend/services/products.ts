import { useMemo } from 'react';
import api from './api';

export function useProductsService() {
  const services = useMemo(() => {
    return {
      getProducts: async () => {
        return api.get('/products');
      },
    };
  }, []);
  return services;
}
