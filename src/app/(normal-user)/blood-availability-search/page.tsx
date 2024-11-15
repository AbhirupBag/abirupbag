"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { cities, states } from "@/lib/locationData";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

interface BloodStock {
  id: string;
  bloodType: string;
  quantity: number;
  bloodBankId: string;
  createdAt: string; // ISO 8601 string
  updatedAt: string; // ISO 8601 string
}

interface BloodBank {
  id: string;
  name: string;
  city: string;
  state: string;
  phone: string;
  address: string;
  createdAt: string; // ISO 8601 string
  bloodStocks: BloodStock[];
}

export default function BloodAvailabilitySearch() {
  const [formData, setFormData] = useState({
    bloodType: "",
    rhFactor: "",
    quantity: "",
    urgency: "",
    city: "",
    state: "",
  });

  const [searchResults, setSearchResults] = useState<BloodBank[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulating an API call
    try {
      const urlObj = new URL(
        process.env.NEXT_PUBLIC_BACKEND_URL + "blood-stock"
      );

      urlObj.searchParams.append("blood-type", formData.bloodType);
      urlObj.searchParams.append("city", formData.city);
      urlObj.searchParams.append("state", formData.state);

      const res = await fetch(urlObj.toString(), {
        method: "GET",
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      setSearchResults(data.data);
    } catch (err) {
      if (err instanceof Error) {
        console.log(err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <motion.div initial="initial" animate="animate" variants={fadeIn}>
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Search Blood Availability
        </h1>

        <form
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-8 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="bloodType"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Blood Type
              </label>
              <select
                id="bloodType"
                name="bloodType"
                value={formData.bloodType}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">Select Blood Type</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="AB">AB</option>
                <option value="O">O</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="rhFactor"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Rh Factor
              </label>
              <select
                id="rhFactor"
                name="rhFactor"
                value={formData.rhFactor}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">Select Rh Factor</option>
                <option value="positive">Positive</option>
                <option value="negative">Negative</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Quantity Needed (Units)
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                min="1"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label
                htmlFor="urgency"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Urgency
              </label>
              <select
                id="urgency"
                name="urgency"
                value={formData.urgency}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">Select Urgency</option>
                <option value="high">High (Emergency)</option>
                <option value="medium">Medium (Within 24 hours)</option>
                <option value="low">Low (Within a week)</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="state"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                State
              </label>
              <select
                id="state"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                City
              </label>
              <select
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">Select City</option>
                {formData.state &&
                  cities[formData.state].map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className="mt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="w-full px-6 py-3 bg-red-600 text-white rounded-md text-lg font-semibold hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              type="submit"
            >
              Search Blood Availability
            </motion.button>
          </div>
        </form>

        {isLoading && (
          <div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="inline-block w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full"
            />
            <p className="mt-2 text-gray-600">
              Searching for blood availability...
            </p>
          </div>
        )}

        {!isLoading && searchResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Search Results
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {searchResults.map((result, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-6 rounded-lg shadow-md"
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {result.name}
                  </h3>
                  <p className="text-gray-600 mb-2">
                    Blood Type: {result.bloodStocks[0].bloodType}
                  </p>
                  <p className="text-gray-600 mb-2">
                    Available Units:{" "}
                    {result.bloodStocks.reduce(
                      (acc, currentValue) => acc + currentValue.quantity,
                      0
                    ) + " ml"}
                  </p>
                  <p className="text-gray-600 mb-2">
                    {result.city + ", " + result.state}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md text-sm font-semibold hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    Request Blood
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {!isLoading && searchResults.length === 0 && (
          <p className="text-center text-gray-600">
            No results found. Please try adjusting your search criteria.
          </p>
        )}
      </motion.div>
    </main>
  );
}
