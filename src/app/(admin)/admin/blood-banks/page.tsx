"use client";
import { SyntheticEvent, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cities, states } from "@/lib/locationData";
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export default function BloodbanksPage() {
  const [isLoading, setisLoading] = useState(false);

  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [state, setState] = useState("");
  const [addingBloodBank] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

  const handleBloodBankSearch = async () => {
    setisLoading(true);
    try {
      const urlObj = new URL(
        process.env.NEXT_PUBLIC_BACKEND_URL + "blood-bank"
      );
      if (selectedState) urlObj.searchParams.append("state", selectedState);
      if (selectedCity) urlObj.searchParams.append("city", selectedCity);
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

  const handleAddBloodBank = async (e: SyntheticEvent<HTMLFormElement>) => {
    // e.preventDefault();
    const data = new FormData(e.currentTarget);
    const body = {
      name: data.get("name"),
      phone: data.get("phone"),
      city: data.get("city"),
      state: data.get("state"),
      address: data.get("address"),
    };
    await fetch("/api/blood-bank", {
      method: "POST",
      body: JSON.stringify(body),
    });
  };

  useEffect(() => {
    void handleBloodBankSearch();
  }, []);

  console.log(state, cities[state as keyof typeof cities]);

  return (
    <div className="h-full flex-1">
      <div className="bg-gray-50 h-full flex-1">
        <main className="container mx-auto px-4 py-8">
          <motion.div initial="initial" animate="animate" variants={fadeIn}>
            <div className="flex justify-between">
              <h1 className="text-3xl font-bold text-gray-900 mb-8">
                Manage Blood banks
              </h1>
              <Dialog
                open={isDialogOpen}
                onOpenChange={(value) => setIsDialogOpen(value)}
              >
                <DialogTrigger>
                  <Button>{"Add blood bank"}</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle>Add blood bank</DialogTitle>
                  <DialogDescription>
                    <form
                      className="flex flex-col gap-4"
                      onSubmit={handleAddBloodBank}
                    >
                      <div>
                        <Label id="name"> Name </Label>
                        <Input name="name" />
                      </div>
                      <div>
                        <Label id="phone"> Phone number </Label>
                        <Input name="phone" />
                      </div>
                      <div>
                        <Label id="state"> State</Label>
                        <Select
                          value={state}
                          onValueChange={(data) => setState(data)}
                          name="state"
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a state" />
                          </SelectTrigger>
                          <SelectContent>
                            {states.map((state) => (
                              <SelectItem value={state} key={state}>
                                {state}{" "}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {/* <Input name="city" /> */}
                      </div>
                      <div>
                        <Label id="city"> City </Label>
                        <Select name="city">
                          <SelectTrigger className="border">
                            <SelectValue placeholder="Select a state" />
                          </SelectTrigger>
                          <SelectContent>
                            {cities[state as keyof typeof cities]?.map(
                              (city) => (
                                <SelectItem value={city} key={city}>
                                  {city}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label id="address"> Address </Label>
                        <Input name="address" />
                      </div>
                      <div>
                        <Button type="submit">
                          {addingBloodBank ? <Loader2 /> : "Add blood bank"}
                        </Button>
                      </div>
                    </form>
                  </DialogDescription>
                </DialogContent>
              </Dialog>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                Filter Blood Banks
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <Select value={selectedState} onValueChange={setSelectedState}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select State" />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={selectedCity}
                  onValueChange={setSelectedCity}
                  disabled={!selectedState}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select City" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedState &&
                      cities[selectedState as keyof typeof cities].map(
                        (city) => (
                          <SelectItem key={city} value={city}>
                            {city}
                          </SelectItem>
                        )
                      )}
                  </SelectContent>
                </Select>
                <Button onClick={handleBloodBankSearch} disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Searching...
                    </>
                  ) : (
                    "Search"
                  )}
                </Button>
              </div>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">All blood banks</h2>
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
                        Phone number
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Address
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        City
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        State
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
                            {bloodBank.phone}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {bloodBank.address}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {bloodBank.city}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            {bloodBank.state}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <div className=" m-2 text-gray-500 ">
                        No any bloodbanks availabe, create one now.
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
