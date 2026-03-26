"use client"
import React, { useContext, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import { getAgreement, postAgreement } from '@/actions/agreement';
import axios from 'axios';
import { store, validation } from '../layout';
import Link from 'next/link';
import { EmailIcon, EmailShareButton, WhatsappIcon, WhatsappShareButton } from 'react-share';







export default function Page() {


    const router = useRouter()

    const [data, setData] = useContext(store)

    const [agreementType, setAgreementType] = useState([])

    useEffect(() => {
        if (data.agreementType) {
            setAgreementType(data.agreementType)
        }

    }, [data])


    const [agreement, setAgreement] = useState({});


    const [agrData, setAgrData] = useState(
        {
            agreementType: "",
            party2: {
                name: "",
                email: "",
                number: "",
                address: "",
                companyName: "",
                signature: "",
                location: "",
                ip: ""
            },

        }



    );



    useEffect(() => {
        const getData = async () => {
            try {
                const agreementData = await getAgreement();
                // const client=await getClient()
                // console.log("agreement data  page ",agreement)
                setAgreement(agreementData)

            } catch (error) {
                console.log(error)
            }
        }
        getData()

    }, [])


    const getAgrData = (e) => {

        if (e.target.name === "agreementType") {
            console.log(e.target.value)
            setAgrData({ ...agrData, [e.target.name]: e.target.value });
        } else {
            setAgrData({ ...agrData, party2: { ...agrData.party2, [e.target.name]: e.target.value } });
        }

    };


    const onSubmitHandler = async (e) => {

        e.preventDefault();

        await postAgreement(agrData);

    };


    //agreement share start ========

    const [agreementUrl, setAgreementUrl] = useState("")

    const shareAgreement = async (e, tokenData) => {
        e.preventDefault()

        const token = await axios.post('/api/edit-token', tokenData);

        setAgreementUrl(`${window.location.href}/${tokenData.id}/${token.data}`)

    }

    const copyLink = async () => {
        await navigator.clipboard.writeText(agreementUrl);
        toast.success("Link successfully copy", {
            position: "top-center",
        });
    }

    //agreement share end ===========


    return (
        <>
            <div className="container shadow-lg p-4 mb-5 bg-body-tertiary rounded ">
                <h1 className='text-center my-4'>Create Agreement </h1>

                <form onSubmit={onSubmitHandler} className="row my-5 needs-validation" noValidate>


                    <div className="col-12 col-md-4 mb-3">
                        <label html="agreementType" className="form-label">Agreement Type <span className='text-danger'>*</span></label>
                        <select className="form-select" id="agreementType" name='agreementType' value={agrData.agreementType} onChange={getAgrData} required>
                            <option disabled value="">Choose...</option>
                            {
                                agreementType.map((item) => <option key={item._id} value={item._id}>{item.agreementName}</option>)
                            }

                        </select>
                        <div className="invalid-feedback">
                            Please select a agreement type.
                        </div>
                    </div>



                    <div className="col-12 col-md-4 mb-3">

                        <label htmlFor="name" className="form-label">Party2 Name <span className='text-danger'>*</span></label>

                        <input
                            type="text"
                            name="name"
                            onChange={getAgrData}

                            value={agrData.party2.name}
                            placeholder="Enter Name  "
                            className="form-control"
                            required
                        />
                        <div className="invalid-feedback">
                            Please Enter a  Name.
                        </div>

                    </div>
                    <div className="col-12 col-md-4 mb-3">

                        <label htmlFor="number" className="form-label">Party2 Mobile Number <span className='text-danger'>*</span></label>

                        <input
                            type="text"
                            name="number"
                            onChange={getAgrData}

                            value={agrData.party2.number}
                            placeholder="Enter Mobile Number  "
                            className="form-control"
                            required
                        />
                        <div className="invalid-feedback">
                            Please Enter a Mobile Number.
                        </div>

                    </div>
                    <div className="col-12 col-md-4 mb-3">

                        <label htmlFor="email" className="form-label">Party2 Email <span className='text-danger'>*</span></label>

                        <input
                            type="email"
                            name="email"
                            onChange={getAgrData}

                            value={agrData.party2.email}
                            placeholder="Enter Email "
                            className="form-control"
                            required
                        />
                        <div className="invalid-feedback">
                            Please Enter a Email.
                        </div>

                    </div>

                    <div className="col-12 col-md-4 mb-3">

                        <label htmlFor="address" className="form-label">Party2 Address <span className='text-danger'>*</span></label>

                        <input
                            type="text"
                            name="address"
                            onChange={getAgrData}

                            value={agrData.party2.address}
                            placeholder="Enter address "
                            className="form-control"
                            required
                        />
                        <div className="invalid-feedback">
                            Please Enter a address.
                        </div>

                    </div>

                    <div className="col-12 col-md-4 mb-3">

                        <label htmlFor="companyName" className="form-label">Party2 Company Name <span className='text-muted'>(optional)</span></label>

                        <input
                            type="text"
                            name="companyName"
                            onChange={getAgrData}
                            value={agrData.party2.companyName}
                            placeholder="Enter Company Name "
                            className="form-control"
                        />
                    </div>

                    <div className='col-12 text-center'>
                        <button className="btn btn-success" onClick={validation} type='submit' >Create Agreement </button>
                    </div>

                </form>



                <div className='row gap-3'>
                    <h3>All Agreement</h3>
                    {
                        Array.isArray(agreement)
                            ? agreement.map((item, i) => (
                                <div key={i} className='col-md-3  bg-white p-3'>
                                    <h6 >Agreement Type : {item.agreementType && item.agreementType.agreementName}</h6>
                                    <p>Party2 Name : {item.party2 && item.party2.name}</p>
                                    <p>Party2 Company Name : {item.party2 && item.party2.companyName}</p>
                                    <p>Date  : {item.createdAt.substring(0, 10)}</p>
                                    <div className='text-center'>
                                        <Link href={`/agreement/${item._id}`} className='btn btn-success mx-3'><i className="bi bi-eye-fill"></i></Link>
                                        <button type="button" data-bs-toggle="offcanvas" data-bs-target="#share" className='btn btn-primary mx-3' onClick={e => shareAgreement(e, { id: item._id, for: "agreement-edit" })}><i className="bi bi-share-fill"></i></button>
                                    </div>

                                </div>
                            ))
                            : null
                    }

                </div>

                <div className="offcanvas offcanvas-bottom" tabIndex="-1" id="share" aria-labelledby="shareLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="shareLabel">Share</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <button className='btn btn-secondary rounded-circle me-2' onClick={copyLink}><i className="bi bi-files fw-bold"></i></button>

                        <WhatsappShareButton url={agreementUrl} className='me-2' >
                            <WhatsappIcon size={40} round={true} />
                        </WhatsappShareButton>

                        <EmailShareButton url={agreementUrl} className='me-2' >
                            <EmailIcon size={40} round={true} />
                        </EmailShareButton>
                    </div>
                </div>


            </div>
        </>
    );
};


