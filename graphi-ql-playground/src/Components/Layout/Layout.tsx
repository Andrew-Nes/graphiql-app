import React, { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <h1>Header here</h1>
      <>{children}</>
      <h1>Footer here</h1>
    </>
  );
};

export default Layout;
