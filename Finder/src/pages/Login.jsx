'use client'

import { useState, useEffect } from 'react'
import { ArrowRight, Loader2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'


export default function Login() {
  const [copied, setCopied] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [domainData, setDomainData] = useState(null)
  const [loading, setLoading] = useState(false)

  let navigate = useNavigate();


  useEffect(() => {
    const accountAddress = localStorage.getItem("Address")
    if (accountAddress) {
      // Navigate to home (Note: navigation logic should be handled by your routing system)
  
      navigate('/home');
      return;
    
      console.log('Navigating to home')
    }
  }, [])

  const getDomainData = async (domainName) => {
    setLoading(true)
    try {
      const response = await fetch(
        `https://eth.blockscout.com/api/v2/search/check-redirect?q=${domainName}`
      )

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const data = await response.json()
      console.log('API Response:', data)
      
      setDomainData(data)
      
      const resolvedAddress = data.parameter
      if (resolvedAddress) {
        localStorage.setItem("Address", resolvedAddress)
        navigate('/home');
        // Navigate to home (Note: navigation logic should be handled by your routing system)
        console.log('Navigating to home')
      } else {
        alert("No resolved address found for this domain.")
      }
    } catch (error) {
      console.error('Error fetching data:', error)

      alert("Error fetching the domain data. Please check the domain name and try again.")
      return;
    } finally {
      setLoading(false)
    }
    
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
    localStorage.setItem("Name", e.target.value)
  }

  const handleSearch = () => {
    if (inputValue === '') {
      alert("Please fill the domain name!")
      return
    }
    getDomainData(inputValue)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 to-indigo-600 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all hover:scale-105">
          <div className="p-8">
            <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-6">Login with ETH Domain</h2>
            <div className="mb-6">
              <div className="relative">
                <input
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200 transition duration-200 ease-in-out text-lg"
                  type="text"
                  id="myInput"
                  value={inputValue}
                  placeholder="Enter your domain (e.g., vitalik.eth)"
                  onChange={handleInputChange}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
            <button
              className={`w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg text-lg font-semibold shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
              onClick={handleSearch}
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                  Processing...
                </span>
              ) : (
                'LOGIN'
              )}
            </button>
          </div>
          
        </div>
      </div>
    </div>
  )
}