import { FC, ReactNode } from 'react';

import { Header } from '../Header';
import { Footer } from '../Footer';

type LayoutProps = {
  children: ReactNode;
};

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};