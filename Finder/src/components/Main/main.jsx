import React from 'react'
import { useEffect, useState } from "react";
import NormalTransaction from '../NormalTransaction';
import InternalTransaction from '../InternalTransaction';

import { useNavigate } from 'react-router-dom'
var accountAddress = localStorage.getItem("Address");
function Main() {

    
    const [profile,setProfile]=useState('balan');

  
     const handleOp1Change=()=>{
      setProfile('normal');
     }
  
     const handleOp2Change=()=>{
      setProfile('internal')
     }

     if(!accountAddress){
     window.location.reload();
     return;

     }
     let navigate = useNavigate();

  //    useEffect(() => {
  //     if(accountAddress == null){
  //       navigate('/');
  //       return;
  //     }
  //    // getBalances();
  //  }, []);


  return (
    <>
     <div className='mt-[40px] h-[70px] border-2 border-transparent flex justify-center items-center shadow-sm'>
      <div className='ml-[30px] mr-[30px] bg-purple-300 w-2/3 border border-transparent rounded-xl'>
        <fieldset id='switch' className='radio'>
        <div className='flex justify-between'>

         

        <div>
          <input name='switch' id='normal' type='radio' 
          onChange={handleOp1Change}

          />
          <label for="normal" className='text-xl text-slate-800 font-medium'>Normal Txn</label>
          </div>

          <div className='mr-[30px]'>
          <input name='switch' id='internal' type='radio'
           onChange={handleOp2Change}
           />
          <label for="internal" className='text-xl text-slate-800 font-medium'>Internal Txn</label>
          </div>

          </div>
        </fieldset>
      </div>
      
    </div>

      {/* <Profile /> */}
     

      {profile === 'normal' ?  <NormalTransaction address={accountAddress }/>: <></>}
      {profile === 'internal' ?  <InternalTransaction />: <></>}
    </>
  )
}

export default Main