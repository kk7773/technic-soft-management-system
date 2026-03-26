"use client"
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import {useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import SignatureCanvas from 'react-signature-canvas'

import axios from 'axios';
import { postAgreementType } from '@/actions/agreementType';
import { store, validation } from '../layout';
import dynamic from 'next/dynamic';
import MaterialReactTable from 'material-react-table';

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });




export default function Page() {


    const router = useRouter()

    const [data, setData] = useContext(store)

    let singRef = ""

    const [agrData, setAgrData] = useState(
        {
            agreementName: "",
            agreementText: "",
            party1: {
                name: "",
                signature: "",
                location: "",
                ip: ""
            }
        }
    );


    useEffect(() => {

        const handlePermissionChange = async (result) => {

            if (result.state === 'granted') {
                navigator.geolocation.getCurrentPosition(showPosition)

            } else if (result.state === 'prompt') {

                result.onchange = () => {
                    if (result.state === 'granted') {
                        navigator.geolocation.getCurrentPosition(showPosition);
                    }
                };
            }
        };


        const showPosition = async (position) => {
            try {

                const response = await fetch("https://geolocation-db.com/json/");
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                const data = await response.json();

                setAgrData({
                    ...agrData, party1: {
                        ...agrData.party1,
                        location: {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                        },
                        ip: data.IPv4
                    }
                });

            } catch (error) {
                console.log(error)
            }
        };

        navigator.permissions.query({ name: 'geolocation' }).then(handlePermissionChange);

    }, []);


    const getAgrData = (e) => {

        if (e.target.name === "name") {
            setAgrData({ ...agrData, party1: { ...agrData.party1, [e.target.name]: e.target.value } });
        } else {
            setAgrData({ ...agrData, [e.target.name]: e.target.value });
        }

    };


    const uploadSignature = async (event) => {

        const formData = new FormData;

        formData.append("signature", event.target.files[0]);

        const { data } = await axios.post('/api/signature-upload', formData);

        setAgrData({ ...agrData, party1: { ...agrData.party1, signature: data.url } })

        toast.success(data.message, {
            position: "top-center"
        });
    }




    const onSubmitHandler = async (e) => {
        e.preventDefault();

        if (agrData.signature !== "") {

            await postAgreementType(agrData);

            setAgrData({ ...agrData, signature: "", agreementName: "", agreementText: "", })

            singRef.clear()
        } else {
            alert("Please add a signature")
        }
    };



    const dynamicData = (value) => {
        if (agrData.agreementText !== "") {
            setAgrData({ ...agrData, agreementText: agrData.agreementText.slice(0, agrData.agreementText.length - 4) + value })
        }
    }


    //show agreement start =======
    const tableColumns = useMemo(
        () => [
            {
                accessorKey: 'agreementName',
                header: 'Agreement Name',
            },
            {
                accessorKey: 'party1.name',
                header: 'Name',
            },
            {
                accessorKey: 'action',
                header: 'Action'
            }
        ],
        [],
    );

    const [tableData, setTableData] = useState([])

    useEffect(() => {

        if (data.agreementType) {

            const agreementType = data.agreementType

            agreementType.forEach((item, i) => {
                item.action = <><a href={`/agreement-type/${item._id}?action=edit&index=${i}`} className='btn btn-warning'>Edit</a> <a href={`/agreement-type/${item._id}?action=view`} className='btn btn-primary' >View</a> </>
            })

            setTableData(agreementType)
        }

    }, [data])

    //show agreement end =======

    if (agrData.ip === "") {
        return <div className='position-absolute top-50 start-50 translate-middle'>
            <h4>Please enable location.</h4>
            <p>Enable location interaction</p>
            <ol>
                <li>Click on SSL lock</li>
                <li>Go to site Settings</li>
                <li>Allow location permissions</li>
            </ol>
        </div>
    }


    return (
        <>
            <div className="container  ">
                <h3 className='text-center my-4'>Create Agreement Type </h3>

                <form onSubmit={onSubmitHandler} className='my-5 needs-validation shadow-lg p-3 bg-body-tertiary rounded' noValidate>
                    <div className='row p-3'>
                        <div className=" col-md-5">
                            <label htmlFor="agreementName" className="form-label">Agreement Name <span className='text-danger'>*</span></label>

                            <input
                                type="text"
                                name="agreementName"
                                onChange={getAgrData}
                                value={agrData.agreementName}
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
                                onChange={getAgrData}
                                value={agrData.party1.name}
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
                                value={agrData.agreementText}
                                onChange={content => setAgrData({ ...agrData, agreementText: content })}
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

                                setAgrData({ ...agrData, party1: { ...agrData.party1, signature: singRef.getTrimmedCanvas().toDataURL('image/png') } })

                            }} className='btn btn-success ms-5'>Done</button>
                        </div>

                        <div className='col-12 col-lg-4 col-md-6'>
                            <p className='fw-bolder'>Upload signature <small>(Size: 300px * 100px)</small> <span className='text-danger'>*</span>  </p>
                            <label htmlFor="signature" className="form-label bg-dark-subtle rounded " style={{ width: "200px", height: "100px" }}><span className='text-danger'><img style={{ height: "100%", width: "100%", objectFit: "cover" }} src='/signature-placeholder.png' /></span></label>
                            <input type="file" hidden name='signature' id="signature" onChange={uploadSignature} />
                        </div>

                        <div className='col-12 col-lg-4 col-md-6' >
                            <div className='mt-3' style={{ height: "100px", width: "300px" }}>
                                <img src={agrData.party1 ? agrData.party1.signature : ""} style={{ height: "100%", width: "100%" }} id="preview" alt="Upload your signature" />
                            </div >
                        </div>
                    </div>

                    <div className='my-2 text-center'>
                        <button className="btn btn-success" onClick={validation} type='submit'>Create Agreement Type </button>
                    </div>

                </form>

                <h3>All Agreement Type</h3>
                <MaterialReactTable columns={tableColumns} data={tableData} />
            </div>

        </>
    );
};


