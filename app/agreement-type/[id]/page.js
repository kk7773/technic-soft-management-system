
"use client"

import axios from '@/helper/axiosConfig'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import SignatureCanvas from 'react-signature-canvas'
import { useSearchParams } from 'next/navigation'
import { updateAgreement } from '@/actions/agreement'
import { store, validation } from '@/app/layout'
import dynamic from 'next/dynamic'
import { ThreeCircles } from 'react-loader-spinner'
import { patchAgreementType } from '@/actions/agreementType'

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });


export default function Page({ params }) {

    const searchParams = useSearchParams()

    const action = searchParams.get('action');

    const index = searchParams.get('index');

    const [data, setData] = useContext(store)

    const [loader, setLoader] = useState(true)


    let singRef = ""

    const [agreementType, setAgreementType] = useState({})

    const [updateAgreementType, setUpdateAgreementType] = useState({
        party1: {}
    })

    useEffect(() => {

        const newAgreementType = data.agreementType && data.agreementType.filter(item => item._id === params.id)[0]
        setAgreementType(newAgreementType)
        setLoader(false)
        setUpdateAgreementType({ ...updateAgreement, party1: newAgreementType && newAgreementType.party1 })
    }, [data])



    const getAgreementTypeData = (e) => {
        if (e.target.name === "name") {
            setAgreementType({ ...agreementType, party1: { ...agreementType.party1, [e.target.name]: e.target.value } });
            setUpdateAgreementType({ ...updateAgreementType, party1: { ...updateAgreementType.party1, [e.target.name]: e.target.value } });
        } else {
            setAgreementType({ ...agreementType, [e.target.name]: e.target.value });
            setUpdateAgreementType({ ...updateAgreementType, [e.target.name]: e.target.value });
        }
    }

    const dynamicData = (value) => {
        if (agreementType.agreementText !== "") {
            setAgreementType({ ...agreementType, agreementText: agreementType.agreementText.slice(0, agreementType.agreementText.length - 4) + value })
        }
    }

    const uploadSignature = async (event) => {

        const formData = new FormData;

        formData.append("signature", event.target.files[0]);

        const { data } = await axios.post('/api/signature-upload', formData);

        setAgreementType({ ...agreementType, party1: { ...agreementType.party1, signature: data.url } })
        setUpdateAgreementType({ ...updateAgreementType, party1: { ...updateAgreementType.party1, signature: data.url } })

        toast.success(data.message, {
            position: "top-center"
        });
    }

    const update = async (e) => {
        e.preventDefault();
        const newUpdatedAgreementType = await patchAgreementType(agreementType._id, updateAgreementType)

        const newAgreementType = [...data.agreementType]

        newAgreementType[index] = newUpdatedAgreementType

        setData({ ...data, agreementType: newAgreementType })
    }



    if (loader) {
        return <div className="position-absolute top-50 start-50 translate-middle">
            <ThreeCircles
                height="100"
                width="100"
                color="#4fa94d"
                wrapperStyle={{}}
                wrapperclassName=""
                visible={true}
                ariaLabel="three-circles-rotating"
                outerCircleColor="orange"
                innerCircleColor="purple"
                middleCircleColor="green"
            />
        </div>
    }


    return (
        <>
            {
                action === "view" ? <div className='container my-5' >
                    {
                        agreementType ? <>
                            <div dangerouslySetInnerHTML={{ __html: agreementType && agreementType.agreementText }} />

                            <h6>Party 1</h6>
                            <p>Signature</p>
                            <img src={agreementType.party1.signature} alt="" />
                            <p>Name:- {agreementType.party1.name}</p>
                        </> : null
                    }

                </div> : null
            }

            {
                action === "edit" && agreementType ? <div className='container'>
                    <h3 className='text-center my-4'>Edit Agreement Type </h3>
                    <form onSubmit={update} className='my-5 needs-validation shadow-lg p-3 bg-body-tertiary rounded' noValidate>
                        <div className='row p-3'>
                            <div className=" col-md-5">
                                <label htmlFor="agreementName" className="form-label">Agreement Name <span className='text-danger'>*</span></label>

                                <input
                                    type="text"
                                    name="agreementName"
                                    onChange={getAgreementTypeData}
                                    value={agreementType.agreementName}
                                    placeholder="Enter Agreement Name "
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className=" col-md-5">
                                <label htmlFor="name" className="form-label">Name <span className='text-danger'>*</span></label>

                                <input
                                    type="text"
                                    name="name"
                                    onChange={getAgreementTypeData}
                                    value={agreementType.party1 && agreementType.party1.name}
                                    placeholder="Enter Agreement Name "
                                    className="form-control"
                                    required
                                />
                            </div>
                            <label className='my-3'>Add Dynamic Data</label>
                            <div className="col-12">
                                <button type='button' className='btn btn-primary mx-2' onClick={() => dynamicData("{{party1-name}}")}>Party1 Name</button>
                                <button type='button' className='btn btn-primary mx-2' onClick={() => dynamicData("{{date}}")}>Date</button>
                                <button type='button' className='btn btn-primary mx-2' onClick={() => dynamicData("{{company-address}}")}>Company Address</button>
                                <button type='button' className='btn btn-primary mx-2' onClick={() => dynamicData("{{party2-name}}")}>Party2 Name</button>
                                <button type='button' className='btn btn-primary mx-2' onClick={() => dynamicData("{{party2-address}}")}>Party2 Address</button>
                            </div>


                            <div className="col-12 my-3" >
                                <label htmlFor="description" className="form-label">Agreement Text <span className='text-danger'>*</span></label>

                                <JoditEditor
                                    value={agreementType.agreementText}
                                    onChange={content => {
                                        setAgreementType({ ...agreementType, agreementText: content })
                                        setUpdateAgreementType({ ...updateAgreementType, agreementText: content })
                                    }}
                                />

                            </div>


                            <div className='col-12 col-lg-4 col-md-6'>
                                <label className="p-2">Draw Signature</label>
                                <div className='border ' style={{ width: "300px" }}>
                                    <SignatureCanvas penColor='blue'
                                        canvasProps={{ width: 300, height: 100, className: 'sigCanvas bg-gray-400 ' }}
                                        ref={(ref) => { singRef = ref }}
                                    />
                                </div>
                                <button type='button' onClick={() => singRef.clear()} className='btn btn-secondary'>Clear</button>
                                <button type='button' onClick={() => {

                                    setAgreementType({ ...agreementType, party1: { ...agreementType.party1, signature: singRef.getTrimmedCanvas().toDataURL('image/png') } })
                                    setUpdateAgreementType({ ...updateAgreementType, party1: { ...updateAgreementType.party1, signature: singRef.getTrimmedCanvas().toDataURL('image/png') } })

                                }} className='btn btn-success ms-5'>Done</button>
                            </div>

                            <div className='col-12 col-lg-4 col-md-6'>
                                <p className='fw-bolder'>Upload signature <small>(Size: 300px * 100px)</small>  </p>
                                <label htmlFor="signature" className="form-label bg-dark-subtle rounded " style={{ width: "200px", height: "100px" }}><span className='text-danger'><img style={{ height: "100%", width: "100%", objectFit: "cover" }} src='/signature-placeholder.png' /></span></label>
                                <input type="file" hidden name='signature' id="signature" onChange={uploadSignature} />
                            </div>

                            <div className='col-12 col-lg-4 col-md-6' >
                                <div className='mt-3' style={{ height: "100px", width: "300px" }}>
                                    <img src={agreementType.party1 ? agreementType.party1.signature : ""} style={{ height: "100%", width: "100%" }} id="preview" alt="Upload your signature" />
                                </div >
                            </div>
                        </div>

                        <div className='my-2 text-center'>
                            <button className="btn btn-success" onClick={validation} type='submit'>Edit Agreement Type </button>
                        </div>

                    </form>

                </div> : null
            }


        </>
    )
}


