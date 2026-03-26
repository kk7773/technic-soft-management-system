"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import Cookies from 'js-cookie';
import { useContext } from 'react';
import Link from 'next/link';
import { store } from '@/app/layout';

export default function Navbar() {

    const router = useRouter();

    const [data, setData] = useContext(store)

    const logout = async () => {

        Cookies.remove('token')
        Cookies.remove('permission')
        setData({ ...data, userData: {} })
        localStorage.setItem('userData', null)
        router.push("/")

    }


    return (
        <>
            <div className='container my-3'>
                <div className='row'>

                    <div className='col-12 col-md-9'>
                        <Link href='/dashboard' className='btn btn-primary me-3'>Dashboard</Link>
                        <h2 className='text-center d-inline-block'>Technic Soft</h2>
                    </div>
                    {
                        data.userData && data.userData.name ? <div className='col-12 col-md-3 text-end'>
                            <span className='me-4 fw-semibold'>{data.userData.name}</span>
                            <button className='btn btn-info ms-auto' onClick={logout}>Logout</button>
                        </div> : null
                    }

                </div>
                <hr className='mb-5' />
            </div>

        </>
    )
}
