"use client"
import { useRouter } from 'next/navigation'
import React from 'react'

export default function Page() {

    const router = useRouter()

  return (
    <div className='position-absolute top-50 start-50 translate-middle text-center'>
      <h2>You have not permission to access this page.</h2>
      <p>Contact to admin.</p>
      <button className='btn btn-primary' onClick={()=>router.back()}>Back</button>
    </div>
  )
}
