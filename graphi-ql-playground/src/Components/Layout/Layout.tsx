import React, { ReactNode } from 'react';
import { Footer } from '../Footer';

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <h1>Header here</h1>
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
