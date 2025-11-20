import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col" style={{
      backgroundColor: '#ffffff',
      color: '#212529',
      lineHeight: '1.6',
      fontFamily: 'Inter, sans-serif'
    }}>
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;