"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';


const Page = () => {

  const [data, setData] = useState({})

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    setData(userData);
  }, []);



  return (
    <>
      {
        data ? <div className='container'>
          {
            data.permission && data.permission.includes('super-admin') ? <>
              <Link className='btn btn-success m-4' href="/admin">Admin</Link>

              <Link href='/brand-info' className='btn btn-success m-4'>
                Brand Information
              </Link>
              <Link className='btn btn-success m-4' href="/service">Service</Link>
              <Link className='btn btn-success m-4' href="/agreement-type">Agreement Type</Link>

              <Link href='/agreement' className='btn btn-success m-4'>
                Agreement
              </Link>
              {/* <Link href='/create-agreement' className='btn btn-success m-4'>
                Create Agreement
              </Link> */}

            </> : null
          }

          {
            data.permission && data.permission.includes('proposal') || data.permission && data.permission.includes('super-admin') ? <><Link className='btn btn-success m-4' href="/create-proposal">Create Proposal</Link>
              <Link className='btn btn-success m-4' href="/create-proposal/ads">Create Proposal for Ads</Link></> : null
          }

        </div > : null
      }

    </>
  );
};

export default Page;
