import React from 'react';
import { FaFacebookF, FaTelegramPlane, FaYoutube, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-800 to-blue-400 text-white py-8 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-10">

        {/* Logo */}
        <div className="flex justify-center md:justify-start w-full md:w-auto">
          <img
            src="https://moeys.gov.kh/uploads/images/general-sitting/6686023aa632a.png"
            alt="Ministry Logo"
            className="w-48 md:w-72 lg:w-96 object-contain"
          />
        </div>

        {/* Contact Info */}
        <div className="text-center md:text-left">
          <h3 className="text-xl mb-2 font-khmer">ទំនាក់ទំនង</h3>
          <ul className="text-sm space-y-1">
            <li>📞 +855 66 901 800</li>
            <li><a href="#" className="hover:underline">📧 info@moeys.gov.kh</a></li>
            <li><a href="#" className="hover:underline">🌐 webmaster@moeys.gov.kh</a></li>
            <li><a href="#" className="hover:underline">📍 #80, Preah Norodom Blvd, Phnom Penh</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="text-center">
          <h3 className="text-xl mb-2 font-khmer">បណ្តាញសង្គមរបស់យើង</h3>
          <div className="flex justify-center md:justify-start space-x-4 text-2xl">
            <a
              href="#"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-[#1877F2] text-white hover:bg-blue-600 transition"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-[#0088cc] text-white hover:bg-blue-500 transition"
              aria-label="Telegram"
            >
              <FaTelegramPlane />
            </a>
            <a
              href="#"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-[#FF0000] text-white hover:bg-red-700 transition"
              aria-label="YouTube"
            >
              <FaYoutube />
            </a>
            <a
              href="#"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-[#E4405F] text-white hover:bg-pink-600 transition"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
          </div>
        </div>



      </div>
    </footer>
  );
};

export default Footer;
