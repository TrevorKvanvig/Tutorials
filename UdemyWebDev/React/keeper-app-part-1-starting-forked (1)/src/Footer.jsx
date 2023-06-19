import React from 'react';

function Footer(){
  const year = new Date();
  return <div>
    <footer>
      <p>CopyRight {year.getFullYear()}</p>
    </footer>
  </div>
}

export default Footer;