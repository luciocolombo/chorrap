import React from 'react';

function Footer() {
  return (
    <footer backgroundColor="light" className="text-center text-lg-left">
      <div
        className="text-center p-3"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
      >
        &copy; {new Date().getFullYear()} Copyright:{' '}
        <a className="text-dark" href="https://mdbootstrap.com/">
          Sitio desarrollado por Lucio Colombo
        </a>
      </div>
    </footer>
  );
}

export default Footer;
