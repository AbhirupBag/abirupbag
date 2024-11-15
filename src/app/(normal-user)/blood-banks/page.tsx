'use client'

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { cities, states } from "@/lib/locationData"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Loader2 } from 'lucide-react'

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

export default function BloodbanksPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedState, setSelectedState] = useState("")
  const [selectedCity, setSelectedCity] = useState("")
  const [bloodBanks, setBloodBanks] = useState<Array<{
    address: string
    city: string
    id: string
    name: string
    phone: string
    state: string
  }>>([])

  const handleBloodBankSearch = async () => {
    setIsLoading(true)
    try {
      const urlObj = new URL(`${process.env.NEXT_PUBLIC_BACKEND_URL}blood-bank`)
      if (selectedState) urlObj.searchParams.append("state", selectedState)
      if (selectedCity) urlObj.searchParams.append("city", selectedCity)
      const res = await fetch(urlObj.toString(), { method: "GET" })
      const data = await res.json()
      setBloodBanks(data.data)
    } catch (err) {
      if (err instanceof Error) {
        console.error("Error fetching blood banks:", err)
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    handleBloodBankSearch()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <motion.div initial="initial" animate="animate" variants={fadeIn}>
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Manage Blood Banks</h1>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Filter Blood Banks</h2>
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
                    cities[selectedState as keyof typeof cities].map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
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
            <h2 className="text-2xl font-semibold mb-4">All Blood Banks</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Phone Number
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Address
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      City
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      State
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {isLoading ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                        <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                        Loading...
                      </td>
                    </tr>
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
                    <tr>
                      <td colSpan={5} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                        No blood banks available. Please adjust your filters or create a new one.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}