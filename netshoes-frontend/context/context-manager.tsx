import { ChildrenProps } from '@/types/types';
import ProductsProvider from './products-context';

export function ContextManager({ children }: ChildrenProps) {
  // Só foi adicionado context manager para organização e estrutura, obviamente com apenas um provider não seria necessário, mas é uma boa prática para escalar o projeto no futuro.
  return (
    <>
      <ProductsProvider>{children}</ProductsProvider>
    </>
  );
}
