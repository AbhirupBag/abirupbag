"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export default function BloodbanksPage() {
  const [isLoading, setisLoading] = useState(false);
  const [bloodBanks, setBloodBanks] = useState<
    {
      name: string;
      email: string;
      id: string;
    }[]
  >([]);

  const handleBloodBankSearch = async () => {
    setisLoading(true);
    try {
      const urlObj = new URL(process.env.NEXT_PUBLIC_BACKEND_URL + "donaters");
      const res = await fetch(urlObj.toString(), { method: "GET" });
      const data = await res.json();
      setBloodBanks(data.data);
    } catch (err) {
      if (err instanceof Error) {
        console.log(err);
      }
    } finally {
      setisLoading(false);
    }
  };

  useEffect(() => {
    void handleBloodBankSearch();
  }, []);

  return (
    <div className="h-full flex-1">
      <div className="bg-gray-50 h-full flex-1">
        <main className="container mx-auto px-4 py-8">
          <motion.div initial="initial" animate="animate" variants={fadeIn}>
            <div className="flex justify-between">
              <h1 className="text-3xl font-bold text-gray-900 mb-8">
                List of donaters
              </h1>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">All donaters</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Email
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {isLoading ? (
                      <div className=" m-2 text-gray-500 ">Loading...</div>
                    ) : bloodBanks.length > 0 ? (
                      bloodBanks.map((bloodBank) => (
                        <tr key={bloodBank.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {bloodBank.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {bloodBank.email}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <div className=" m-2 text-gray-500 ">
                        No one have donated blood yet
                      </div>
                    )}
                  </tbody>
                </table>
              </div>
            </div>{" "}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
