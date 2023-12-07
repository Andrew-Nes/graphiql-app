import React, { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <h1>Header here</h1>
      <main>{children}</main>
      <h1>Footer here</h1>
    </div>
  );
};

export default Layout;
