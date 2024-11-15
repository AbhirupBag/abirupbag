"use client";

import { useAuth } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const statsCounter = {
  initial: { opacity: 0, scale: 0.5 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.8, ease: "easeOut" },
};

export default function Component() {
  const [selectedImage, setSelectedImage] = useState<{
    src: string;
    alt: string;
  }>();

  const { isSignedIn, signOut } = useAuth();

  const galleryImages = [
    {
      src: "https://plus.unsplash.com/premium_photo-1723044801868-b5ad0e257f5c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Blood donation process",
    },
    {
      src: "https://lucygroup-production-assets.s3.eu-west-2.amazonaws.com/2019/04/LE-Blooddonationcamp201820180907_125355-2018-1440x740.jpg",
      alt: "Donor giving blood",
    },
    {
      src: "https://static.vecteezy.com/system/resources/previews/013/417/782/non_2x/delhi-india-june-19-2022-blood-donor-at-blood-donation-camp-held-at-balaji-temple-vivek-vihar-delhi-india-image-for-world-blood-donor-day-on-june-14-every-year-blood-donation-camp-at-temple-free-photo.jpg",
      alt: "Blood bank storage",
    },
    {
      src: "https://images.hindustantimes.com/img/2021/09/10/550x309/bfb04ab4-126d-11ec-8f84-d3748427d977_1631302621025.jpg",
      alt: "Medical staff with donor",
    },
    {
      src: "https://thumbs.dreamstime.com/b/delhi-india-june-blood-donor-blood-donation-camp-held-balaji-temple-vivek-vihar-delhi-india-image-world-blood-donor-day-259601257.jpg",
      alt: "Blood testing equipment",
    },
    {
      src: "https://set.jainuniversity.ac.in/application/themes/set/assets/images/activities/amhithi-2017/Blood-Donation-Camp-Amhithi-2.jpg",
      alt: "Community blood drive",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 w-full bg-white/90 backdrop-blur-sm z-50 border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold text-red-600"
            >
              BloodLife
            </motion.div>
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="#about"
              className="text-gray-600 hover:text-red-600 transition-colors"
            >
              About
            </Link>
            <Link
              href="#donate"
              className="text-gray-600 hover:text-red-600 transition-colors"
            >
              Donate
            </Link>
            <Link
              href="#impact"
              className="text-gray-600 hover:text-red-600 transition-colors"
            >
              Impact
            </Link>
            <Link
              href="#gallery"
              className="text-gray-600 hover:text-red-600 transition-colors"
            >
              Gallery
            </Link>
            {isSignedIn ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                onClick={() => {
                  if (isSignedIn) {
                    signOut();
                  }
                }}
              >
                Logout
              </motion.button>
            ) : (
              <Link href={"/signin"}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                >
                  Login
                </motion.button>
              </Link>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-20 bg-gradient-to-b from-red-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="initial"
              animate="animate"
              variants={fadeIn}
              className="space-y-6"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                Your Blood Can Save
                <span className="text-red-600"> Lives Today</span>
              </h1>
              <p className="text-xl text-gray-600">
                Every donation counts. One pint of blood can save up to three
                lives. Be a hero, donate blood.
              </p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                whileHover={{ scale: 1.02 }}
              >
                <Link href={"/blood-availability-search"}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="px-8 py-4 bg-red-600 text-white rounded-full text-lg font-semibold hover:bg-red-700 transition-colors"
                  >
                    Search for blood
                  </motion.button>
                </Link>
                <Link href={"/book-appointment"}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="px-8 py-4 border-2 border-red-600 text-red-600 rounded-full text-lg font-semibold hover:bg-red-50 transition-colors"
                  >
                    Book Appointment
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Image
                src="https://plus.unsplash.com/premium_photo-1723044801280-fe1932fa9841?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Blood Donation"
                width={600}
                height={400}
                className="rounded-2xl shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-red-600">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center text-white max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Find blood banks near you
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Enter the city and state you live in and find the blood banks
              around you
            </p>
            <Link href={"/blood-banks"}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-8 py-4 bg-white text-red-600 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Find now
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 bg-white" id="impact">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={statsCounter}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            <div className="space-y-2">
              <div className="text-4xl font-bold text-red-600">3+</div>
              <div className="text-gray-600">Lives Saved Per Donation</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-red-600">10k+</div>
              <div className="text-gray-600">Active Donors</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-red-600">50+</div>
              <div className="text-gray-600">Blood Banks</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-red-600">24/7</div>
              <div className="text-gray-600">Emergency Support</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50" id="donate">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How Blood Donation Works
            </h2>
            <p className="text-xl text-gray-600">
              The process is simple, safe, and takes only about an hour from
              start to finish
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Registration",
                description:
                  "Fill out a quick form and complete a mini-physical",
                icon: "📝",
              },
              {
                title: "Donation",
                description: "The actual donation takes only 8-10 minutes",
                icon: "💉",
              },
              {
                title: "Recovery",
                description: "Enjoy refreshments while helping save lives",
                icon: "☕",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white p-8 rounded-2xl shadow-lg"
              >
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-white" id="gallery">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Blood Donation Gallery
            </h2>
            <p className="text-xl text-gray-600">
              See the impact of your donations and the process in action
            </p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative overflow-hidden rounded-lg cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                image
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={400}
                  height={300}
                  className="object-cover w-full h-64 transition-transform duration-300 hover:scale-110"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(undefined)}
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative"
            >
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                width={800}
                height={600}
                className="max-w-full max-h-[90vh] object-contain"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(undefined);
                }}
                className="absolute top-4 right-4 text-white text-xl bg-red-600 rounded-full w-10 h-10 flex items-center justify-center"
              >
                &times;
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <section className="py-20 bg-red-600">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center text-white max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to make a Difference?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Your donation can help save multiple lives. Schedule your
              appointment today.
            </p>
            <Link href={"/book-appointment"}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-8 py-4 bg-white text-red-600 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Book Your Appointment
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">BloodLife</h3>
              <p className="text-gray-400">
                Connecting donors with those in need, saving lives one donation
                at a time.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link
                    href="#about"
                    className="hover:text-white transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="#donate"
                    className="hover:text-white transition-colors"
                  >
                    Donate Blood
                  </Link>
                </li>
                <li>
                  <Link
                    href="#impact"
                    className="hover:text-white transition-colors"
                  >
                    Our Impact
                  </Link>
                </li>
                <li>
                  <Link
                    href="#gallery"
                    className="hover:text-white transition-colors"
                  >
                    Gallery
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Email: contact@bloodlife.org</li>
                <li>Phone: (555) 123-4567</li>
                <li>Emergency: (555) 999-9999</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>© {new Date().getFullYear()} BloodLife. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
