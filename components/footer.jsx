import React from "react";

const Footer = () => {
  return (
    <footer className="border-t border-gray-800/50 py-8 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
      
      {/* Left Section */}
      <div className="text-sm text-gray-400 text-center md:text-left">
        © {new Date().getFullYear()} Made with ❤️ by{" "}
        <span className="font-semibold text-white">Prateek Patel</span>
      </div>

      {/* Right Section */}
      <div className="flex gap-6 items-center">
        
        {/* GitHub */}
        <a
          href="https://github.com/Prateekcodex"
          target="_blank"
          rel="noopener noreferrer"
          className="group"
        >
          <svg
            className="w-6 h-6 text-gray-400 group-hover:text-white transition transform group-hover:scale-110"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 0C5.37 0 0 5.37 0 12a12 12 0 008.2 11.38c.6.1.82-.26.82-.58v-2.23c-3.34.72-4.04-1.6-4.04-1.6-.54-1.38-1.32-1.74-1.32-1.74-1.08-.74.08-.72.08-.72 1.2.08 1.84 1.23 1.84 1.23 1.06 1.82 2.78 1.3 3.46 1 .1-.77.42-1.3.76-1.6-2.66-.3-5.46-1.34-5.46-5.96 0-1.32.46-2.4 1.22-3.24-.12-.3-.54-1.5.12-3.14 0 0 1-.32 3.3 1.24a11.4 11.4 0 016 0C17 3.7 18 4.02 18 4.02c.66 1.64.24 2.84.12 3.14.76.84 1.22 1.92 1.22 3.24 0 4.64-2.8 5.66-5.48 5.96.44.38.82 1.12.82 2.26v3.36c0 .32.22.7.82.58A12 12 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
        </a>

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/prateek098/"
          target="_blank"
          rel="noopener noreferrer"
          className="group"
        >
          <svg
            className="w-6 h-6 text-gray-400 group-hover:text-blue-500 transition transform group-hover:scale-110"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.5a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM20.45 20.45h-3.56v-5.6c0-1.34-.03-3.06-1.86-3.06-1.86 0-2.14 1.45-2.14 2.96v5.7H9.33V9h3.42v1.56h.05c.48-.9 1.64-1.86 3.37-1.86 3.6 0 4.27 2.37 4.27 5.45v6.3z" />
          </svg>
        </a>

      </div>
    </footer>
  );
};

export default Footer;