"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { UserButton } from "@clerk/nextjs";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className=" flex flex-col w-full ">
        <header className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-2xl font-bold text-red-600"
              >
                BloodLife Admin
              </motion.div>
            </Link>
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className="text-gray-600 hover:text-red-600 transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="#"
                className="text-gray-600 hover:text-red-600 transition-colors"
              >
                Inventory
              </Link>
              <Link
                href="#"
                className="text-gray-600 hover:text-red-600 transition-colors"
              >
                Reports
              </Link>
              <div>
                <UserButton />
              </div>
            </nav>
          </div>
        </header>
        <main className="w-full">{children}</main>
        <footer className="bg-gray-900 text-white py-8 mt-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-between">
              <div className="w-full md:w-1/3 mb-6 md:mb-0">
                <h3 className="text-xl font-bold mb-2">BloodLife Admin</h3>
                <p className="text-gray-400">
                  Managing blood donations efficiently.
                </p>
              </div>
              <div className="w-full md:w-1/3 mb-6 md:mb-0">
                <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
                <ul className="text-gray-400">
                  <li>
                    <Link
                      href="/"
                      className="hover:text-white transition-colors"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="hover:text-white transition-colors"
                    >
                      Inventory
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="hover:text-white transition-colors"
                    >
                      Reports
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="w-full md:w-1/3">
                <h4 className="text-lg font-semibold mb-2">Support</h4>
                <p className="text-gray-400">Email: admin@bloodlife.org</p>
                <p className="text-gray-400">Phone: (123) 456-7890</p>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
              <p>
                © {new Date().getFullYear()} BloodLife Admin. All rights
                reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
