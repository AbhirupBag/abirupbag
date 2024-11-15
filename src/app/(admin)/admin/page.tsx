"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

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

interface IAppointments {
  id: string;
  date: string;
  status: string;
  createdAt: string;
  bloodBank: BloodBank;
  userId: string;
  bloodBankId: string;
  user: {
    name: string;
    email: string;
  };
}

export default function Admin() {
  const router = useRouter();
  const { user, isLoaded } = useUser();

  const [formData, setFormData] = useState({
    donorName: "",
    donorId: "",
    bloodType: "",
    rhFactor: "",
    quantity: "",
    donationDate: "",
    expirationDate: "",
    hbLevel: "",
    bloodPressure: "",
    pulseRate: "",
    temperature: "",
    notes: "",
  });
  const [isAppointmentLoading, setIsAppointmentLoading] = useState(false);
  const [appointments, setAppointments] = useState<IAppointments[]>([]);
  const [selectedAppointment, setSelectedAppointment] =
    useState<IAppointments>();
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
    // Here you would typically send the form data to your backend

    setIsLoading(true);
    try {
      const urlObj = new URL(
        process.env.NEXT_PUBLIC_BACKEND_URL + "blood-stock"
      );
      const res = await fetch(urlObj.toString(), {
        method: "POST",
        body: JSON.stringify({
          appointmentId: selectedAppointment?.id,
          bloodType: formData.bloodType,
          quantity: formData.quantity,
          bloodBankId: selectedAppointment?.bloodBankId,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error);
      }

      setFormData({
        donorName: "",
        donorId: "",
        bloodType: "",
        rhFactor: "",
        quantity: "",
        donationDate: "",
        expirationDate: "",
        hbLevel: "",
        bloodPressure: "",
        pulseRate: "",
        temperature: "",
        notes: "",
      });
      setSelectedAppointment(undefined);
      void fetchAppointmentData();
      alert("Blood donation details added successfully!");
    } catch (err) {
      if (err instanceof Error) {
        console.log(err);
      }
    } finally {
      setIsLoading(false);
    }
    // For now, we'll just show an alert
  };

  const fetchAppointmentData = async () => {
    setIsAppointmentLoading(true);
    try {
      const urlObj = new URL(
        process.env.NEXT_PUBLIC_BACKEND_URL + "book-appointment"
      );

      if (!isLoaded) return;

      if (!user?.id) {
        router.push("/signin");
        return;
      }

      urlObj.searchParams.append("userId", "admin");

      const res = await fetch(urlObj.toString(), { method: "GET" });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error);
      }

      setAppointments(data.data);
    } catch (err) {
      if (err instanceof Error) {
        console.log(err);
      }
    } finally {
      setIsAppointmentLoading(false);
    }
  };

  useEffect(() => {
    void fetchAppointmentData();
  }, [isLoaded, user]);

  return (
    <div>
      <div className="bg-gray-50">
        <main className="container mx-auto px-4 py-8">
          <motion.div initial="initial" animate="animate" variants={fadeIn}>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
              Manage Blood Donations
            </h1>

            {!selectedAppointment ? (
              <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-semibold mb-4">
                  Select an Appointment
                </h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Donor Name
                        </th>
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
                          Time
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
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {isAppointmentLoading ? (
                        <div className=" m-2 text-gray-500 ">Loading...</div>
                      ) : appointments.length > 0 ? (
                        appointments.map((appointment) => (
                          <tr key={appointment.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {appointment.user.name ?? appointment.user.email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {appointment.date}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {appointment.date.substring(0, 10)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {appointment.bloodBank.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button
                                onClick={() =>
                                  setSelectedAppointment(appointment)
                                }
                                className="text-red-600 hover:text-red-900 transition-colors"
                              >
                                Select
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <div className=" m-2 text-gray-500 ">
                          No any appointement left
                        </div>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-8 bg-white shadow-md rounded-lg p-8"
              >
                <div>
                  <h2 className="text-2xl font-semibold mb-4">
                    Add Blood Donation Details
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Adding details for appointment on{" "}
                    {selectedAppointment.date.substring(0, 10)}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="donorName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Donor Name
                    </label>
                    <input
                      type="text"
                      id="donorName"
                      name="donorName"
                      value={selectedAppointment.user.name}
                      disabled
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
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
                      Quantity (mL)
                    </label>
                    <input
                      type="number"
                      id="quantity"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      required
                      min="0"
                      step="50"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="donationDate"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Donation Date
                    </label>
                    <input
                      type="date"
                      id="donationDate"
                      name="donationDate"
                      value={formData.donationDate}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="expirationDate"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Expiration Date
                    </label>
                    <input
                      type="date"
                      id="expirationDate"
                      name="expirationDate"
                      value={formData.expirationDate}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="hbLevel"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Hemoglobin Level (g/dL)
                    </label>
                    <input
                      type="number"
                      id="hbLevel"
                      name="hbLevel"
                      value={formData.hbLevel}
                      onChange={handleInputChange}
                      required
                      step="0.1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="bloodPressure"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Blood Pressure (mmHg)
                    </label>
                    <input
                      type="text"
                      id="bloodPressure"
                      name="bloodPressure"
                      value={formData.bloodPressure}
                      onChange={handleInputChange}
                      placeholder="e.g., 120/80"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="pulseRate"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Pulse Rate (bpm)
                    </label>
                    <input
                      type="number"
                      id="pulseRate"
                      name="pulseRate"
                      value={formData.pulseRate}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="temperature"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Temperature (°C)
                    </label>
                    <input
                      type="number"
                      id="temperature"
                      name="temperature"
                      value={formData.temperature}
                      onChange={handleInputChange}
                      required
                      step="0.1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedAppointment(undefined);
                      setFormData({
                        donorName: "",
                        donorId: "",
                        bloodType: "",
                        rhFactor: "",
                        quantity: "",
                        donationDate: "",
                        expirationDate: "",
                        hbLevel: "",
                        bloodPressure: "",
                        pulseRate: "",
                        temperature: "",
                        notes: "",
                      });
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className=" animate-spin">
                        <Loader2 />
                      </div>
                    ) : (
                      "Add Blood Donation Details"
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
