// src/layout/Layout.jsx
import Header from '../components/Header';
import MenuPost from '../components/menu/MenuPost';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';

function Layout() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div>
      <Header isOpen={isOpen} />
      <div style={{ display: 'flex' }}>
        <MenuPost isOpen={isOpen} toggleMenu={() => setIsOpen(!isOpen)} />
        <main
          style={{
            marginLeft: isOpen ? '220px' : '60px',
            transition: 'margin-left 0.3s ease',
            padding: '20px',
            flex: 1,
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
