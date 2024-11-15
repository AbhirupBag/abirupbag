import Link from "next/link";
import React from "react";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold hover:scale-105 transition-all duration-150 text-red-600">
              BloodLife
            </div>
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-600 hover:text-red-600 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/#donate"
              className="text-gray-600 hover:text-red-600 transition-colors"
            >
              Donate
            </Link>
            <Link
              href="/#about"
              className="text-gray-600 hover:text-red-600 transition-colors"
            >
              About Us
            </Link>
          </nav>
        </div>
      </header>

      <div>{children}</div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h3 className="text-xl font-bold mb-2">BloodLife</h3>
              <p className="text-gray-400">
                Connecting blood donors with those in need.
              </p>
            </div>
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
              <ul className="text-gray-400">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/book-appointment"
                    className="hover:text-white transition-colors"
                  >
                    Donate Blood
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blood-availability-search"
                    className="hover:text-white transition-colors"
                  >
                    Find Blood
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#about"
                    className="hover:text-white transition-colors"
                  >
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/3">
              <h4 className="text-lg font-semibold mb-2">Contact Us</h4>
              <p className="text-gray-400">Email: info@bloodlife.org</p>
              <p className="text-gray-400">Phone: (123) 456-7890</p>
              <p className="text-gray-400">Emergency: (800) 555-1234</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>© {new Date().getFullYear()} BloodLife. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default layout;
