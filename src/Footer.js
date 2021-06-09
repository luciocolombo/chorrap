import React from 'react';

function Footer() {
  return (
    <footer backgroundcolor="light" className="text-center text-lg-left">
      <div
        className="text-center p-3"
        style={{ backgroundcolor: 'rgba(0, 0, 0, 0.2)' }}
      >
        &copy; {new Date().getFullYear()} Copyright:{' '}
        <a className="text-dark" href="https://luciocolombodev.netlify.app/">
          Sitio desarrollado por Lucio Colombo
        </a>
      </div>
    </footer>
  );
}

export default Footer;
