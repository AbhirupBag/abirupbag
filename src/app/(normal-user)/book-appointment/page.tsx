"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { cities, states } from "@/lib/locationData";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

interface BloodBank {
  id: string;
  name: string;
  city: string;
  state: string;
  phone: string;
  address: string;
  createdAt: string;
}

interface IpreviousAppointments {
  id: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  userId: string;
  bloodBankId: string;
  date: string;
  status: string;
  createdAt: string;
  bloodBank: BloodBank;
}

export default function BookAppointment() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    state: "",
    city: "",
    bloodBank: "",
    name: "",
    email: "",
    phone: "",
    date: "",
  });

  const [bloodBanks, setBloodBanks] = useState<
    {
      address: string;
      city: string;
      id: string;
      name: string;
      phone: string;
      state: string;
    }[]
  >([]);

  const [previousAppointments, setPreviousAppointments] = useState<
    IpreviousAppointments[]
  >([]);

  const [isLoading, setisLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isLoaded) {
      if (!isSignedIn) {
        router.push("/signin");
      }
    }
  }, [isSignedIn, isLoaded, router]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: name === "date" ? new Date(value) : value, // Convert to Date if name is "date"
    }));
  };

  const handleBloodBankSearch = async () => {
    setisLoading(true);
    try {
      const urlObj = new URL(
        process.env.NEXT_PUBLIC_BACKEND_URL + "blood-bank"
      );
      urlObj.searchParams.append("state", formData.state);
      urlObj.searchParams.append("city", formData.city);
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

  const handleBookAppointment = async () => {
    setisLoading(true);
    try {
      const urlObj = new URL(
        process.env.NEXT_PUBLIC_BACKEND_URL + "book-appointment"
      );

      const res = await fetch(urlObj.toString(), {
        method: "POST",
        body: JSON.stringify({
          userId: user?.id,
          userName: formData.name,
          userEmail: formData.email,
          userPhone: formData.phone,
          bloodBankId: formData.bloodBank,
          date: formData.date,
          status: "Scheduled",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error);
      }

      setStep(1);
      setFormData({
        state: "",
        city: "",
        bloodBank: "",
        name: "",
        email: "",
        phone: "",
        date: "",
      });

      alert("Appointment booked successfully!");
    } catch (err) {
      if (err instanceof Error) {
        console.log(err);
      }
    } finally {
      setisLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (step === 1) {
      await handleBloodBankSearch();

      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else {
      await handleBookAppointment();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const urlObj = new URL(
          process.env.NEXT_PUBLIC_BACKEND_URL + "book-appointment"
        );

        if (!isLoaded) return;

        if (!user?.id) {
          router.push("/signin");
          return;
        }

        urlObj.searchParams.append("userId", user.id);

        const res = await fetch(urlObj.toString(), { method: "GET" });
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error);
        }

        setPreviousAppointments(data.data);
      } catch (err) {
        if (err instanceof Error) {
          console.log(err);
        }
      }
    };
    void fetchData();
  }, [isLoaded, user]);

  return (
    <main className="container mx-auto px-4 py-8">
      <motion.div initial="initial" animate="animate" variants={fadeIn}>
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Book Your Blood Donation Appointment
        </h1>

        <form
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-8"
        >
          {step === 1 && (
            <div className="space-y-6">
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
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-4">
                Select a Blood Bank
              </h2>
              {bloodBanks.map((bank) => (
                <div key={bank.id} className="flex items-center space-x-3">
                  <input
                    type="radio"
                    id={bank.id}
                    name="bloodBank"
                    value={bank.id}
                    checked={formData.bloodBank === bank.id}
                    onChange={handleInputChange}
                    className="focus:ring-red-500 h-4 w-4 text-red-600 border-gray-300"
                    required
                  />
                  <label
                    htmlFor={bank.id}
                    className="block text-sm font-medium text-gray-700"
                  >
                    {bank.name}
                  </label>
                </div>
              ))}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Preferred Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date ? formData.date.substring(0, 10) : ""}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-between">
            {step > 1 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-6 py-2 bg-gray-600 text-white rounded-md text-lg font-semibold hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                onClick={() => setStep(step - 1)}
                type="button"
              >
                Back
              </motion.button>
            )}
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-6 py-2 bg-red-600 text-white rounded-md text-lg font-semibold hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              type="submit"
            >
              {isLoading ? (
                <div className=" animate-spin">
                  <Loader2 />
                </div>
              ) : step === 3 ? (
                "Book Appointment"
              ) : (
                "Next"
              )}
            </motion.button>
          </div>
        </form>

        {/* Previous Appointments Section */}
        {previousAppointments.length > 0 && (
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeIn}
            className="max-w-4xl mx-auto mt-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Your Previous Appointments
            </h2>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Blood Bank
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {previousAppointments.map((appointment) => (
                    <tr key={appointment.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {appointment.date.substring(0, 10)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {appointment.bloodBank.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            appointment.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : appointment.status === "Cancelled"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {appointment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </motion.div>
    </main>
  );
}
