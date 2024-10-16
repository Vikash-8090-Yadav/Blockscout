import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [copied, setCopied] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [domainData, setDomainData] = useState(null);  // Store domain data here
  const [loading, setLoading] = useState(false);       // For loading state

  let navigate = useNavigate();
  var accountAddress = localStorage.getItem("Address");

  useEffect(() => {
    if (accountAddress) {
      navigate('/home');
      return;
    }
  }, []);

  const getDomainData = async (domainName) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://eth.blockscout.com/api/v2/search/check-redirect?q=${domainName}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('API Response:', data);
      
      setDomainData(data); // Set domain data
      
      const resolvedAddress = data.parameter;
      if (resolvedAddress) {
        localStorage.setItem("Address", resolvedAddress);
        // navigate('/home'); // Uncomment this line if you want to navigate after successful fetch
      } else {
        alert("No resolved address found for this domain.");
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      alert("Error fetching the domain data. Please check the domain name and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    localStorage.setItem("Name", e.target.value);
  };

  const handleSearch = () => {
    console.log('Search clicked with value:', inputValue);
    if (inputValue === '') {
      alert("Please fill the domain name!");
      return;
    }
    getDomainData(inputValue); // Call the fetch function with the input domain name
  };

  const handleCopy = (text) => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <>
      <div className='flex flex-col items-center justify-center h-screen'>
        <div className='mb-6'>
          <div className='relative flex rounded-xl border-2 border-transparent h-20 p-2 w-80 bg-slate-300 shadow-2xl bg-gradient-to-l from-purple-300 via-purple-300 to-purple-400'>
            <input
              className='flex-1 h-full px-4 text-xl text-gray-900 bg-transparent focus:outline-none'
              type='text'
              id='myInput'
              value={inputValue}
              placeholder='Type- domain.base'
              onChange={handleInputChange}
            />
          </div>
        </div>
        
        <button className='py-2 px-6 bg-blue-500 text-white rounded-lg shadow-lg' onClick={handleSearch}>
          {loading ? 'Loading...' : 'LOGIN'}
        </button>
        
        {domainData && domainData.parameter && (
          <div className="mt-4">
            <h3>Resolved Address:</h3>
            <p>{domainData.parameter}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default Login;
