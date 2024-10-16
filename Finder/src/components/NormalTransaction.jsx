'use client'

import { useState, useEffect } from 'react'
import { ArrowUpRight, Loader } from 'lucide-react'

export default function NormalTransaction({ address }) {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getData = async () => {
      if (!address) return

      setLoading(true)
      try {
        const response = await fetch(
          `https://eth.blockscout.com/api?module=account&action=txlist&address=${address}&page=1&offset=10&sort=asc`
        )

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const data = await response.json()
        if (data.result === 'Max rate limit reached') {
          console.log("Rate limit reached")
          return
        }

        setTransactions(data.result)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    getData()
  }, [address])

  const truncateAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-extrabold text-center mb-12 text-white pb-2 tracking-tight leading-none">
          Normal Transactions
        </h2>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader className="w-16 h-16 text-white animate-spin" />
          </div>
        ) : (
          <div className="bg-gray-900 bg-opacity-70 backdrop-filter backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-gray-700">
            {transactions.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-gray-800">
                    <tr>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-300 uppercase tracking-wider">
                        Block
                      </th>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-300 uppercase tracking-wider">
                        Time
                      </th>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-300 uppercase tracking-wider">
                        Transaction
                      </th>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-300 uppercase tracking-wider">
                        From
                      </th>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-300 uppercase tracking-wider">
                        To
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-900 divide-y divide-gray-700">
                    {transactions.map((transaction, index) => (
                      <tr key={transaction.hash} className={`${index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-900'} hover:bg-gray-700 transition-colors duration-200`}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300">{transaction.blockNumber}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{new Date(parseInt(transaction.timeStamp) * 1000).toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <a
                            href={`https://eth.blockscout.com/tx/${transaction.hash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                          >
                            View
                            <ArrowUpRight className="ml-1 h-4 w-4" />
                          </a>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 font-mono">{truncateAddress(transaction.from)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 font-mono">{truncateAddress(transaction.to)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-3xl font-bold text-gray-300 py-12 text-center">No transactions available.</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}