import React from "react";

function Footer() {
  return (
    <footer className="bg-blue-600 text-white py-2 text-center">
      <p>&copy; {new Date().getFullYear()} Quiz App. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
