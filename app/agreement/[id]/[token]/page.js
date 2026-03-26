'use client'
import { getAgreementById, updateAgreementByToken } from '@/actions/agreement'
import { verifyToken } from '@/actions/editToken';
import axios from '@/helper/axiosConfig';
import React, { useEffect, useState } from 'react'
import SignatureCanvas from 'react-signature-canvas'
import { toast } from 'react-toastify';

export default function Page({ params }) {

    let signRef = ""

    const [agreement, setAgreement] = useState({});

    const [tokenData, setTokenData] = useState({
        exp: ""
    })

    useEffect(() => {
        const fetchData = async () => {
            const agreementData = await getAgreementById(params.id)

            agreementData.agreementType.agreementText = agreementData.agreementType.agreementText.replace(/{{party1-name}}|{{date}}|{{company-address}}|{{party2-name}}|{{party2-address}}/g, (item) => {

                if (item === "{{party1-name}} ") {

                    return `<b>${agreementData.agreementType.party1.name.toUpperCase()}</b>`

                } else if (item === "{{date}}") {

                    return `<b>${agreementData.createdAt.substring(0, 10)}</b>`

                } else if (item === "{{company-address}}") {
                    return `<b>${item}</b>`
                } else if (item === "{{party2-name}}") {
                    return `<b>${agreementData.party2.name.toUpperCase()}</b>`
                } else if (item === "{{party2-address}}") {
                    return `<b>${agreementData.party2.address}</b>`
                } else {
                    return `<b>${item}</b>`
                }

            });

            setAgreement(agreementData)

            const token = await verifyToken(params.token)

            setTokenData(token)

        }

        fetchData()

    }, [params])




    const uploadSignature = async (event) => {

        const formData = new FormData;

        formData.append("signature", event.target.files[0]);

        const { data } = await axios.post('/api/signature-upload', formData);

        setAgreement({ ...agreement, party2: { ...agreement.party2, signature: data.url } })

        toast.success(data.message, {
            position: "top-center"
        });
    }

    const submit = () => {

        const updateAgreement = agreement.party2

        const handlePermissionChange = async (result) => {

            if (result.state === 'granted') {
                navigator.geolocation.getCurrentPosition(showPosition)

            } else if (result.state === 'prompt') {
                document.getElementById("locationModelBtn").click()
                result.onchange = () => {
                    if (result.state === 'granted') {
                        navigator.geolocation.getCurrentPosition(showPosition);
                    }
                };
            } else {
                document.getElementById("locationModelBtn").click()
            }
        };


        const showPosition = async (position) => {
            try {

                const response = await fetch("https://geolocation-db.com/json/");
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                const data = await response.json();

                updateAgreement.location = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                }
                updateAgreement.ip = data.IPv4

                await updateAgreementByToken(params.id, params.token, { party2: updateAgreement })
            } catch (error) {
                console.log(error)
            }
        };

        navigator.permissions.query({ name: 'geolocation' }).then(handlePermissionChange);

    }


    return (
        tokenData.exp !== undefined ? <div className='container my-5'>
            {agreement.agreementType && <>
                <p>This page will be expire in {tokenData.exp.replace(/am|pm/g, (text) => {
                    return text.toUpperCase()
                })}</p>

                <div dangerouslySetInnerHTML={{ __html: agreement.agreementType.agreementText }} />

                <div className='d-flex justify-content-around'>
                    <div>
                        <b>Party 1</b>
                        <p>Name : {agreement.agreementType.party1.name}</p>
                        <div style={{ width: "300px", height: "100px" }}>
                            <img src={agreement.agreementType.party1.signature} style={{ width: "100%", height: "100%" }} alt="sign" />
                        </div>

                    </div>
                    <div>
                        <b>Party 2</b>
                        <p>Name : {agreement.party2.name}</p>
                        <div style={{ width: "300px", height: "100px" }}>
                            <img src={agreement.party2.signature} style={{ width: "100%", height: "100%" }} alt="sign" />
                        </div>

                        <div>
                            <label className="p-2">Draw Signature</label>
                            <div className='border ' style={{ width: "300px" }}>
                                <SignatureCanvas penColor='blue'
                                    canvasProps={{ width: 300, height: 100, className: 'sigCanvas bg-gray-400 ' }}
                                    ref={(ref) => { signRef = ref }}
                                />
                            </div>
                            <button type='button' onClick={() => signRef.clear()} className='btn btn-secondary'>Clear</button>
                            <button type='button' onClick={() => {

                                setAgreement({ ...agreement, party2: { ...agreement.party2, signature: signRef.getTrimmedCanvas().toDataURL('image/png') } })

                            }} className='btn btn-success ms-5'>Done</button>
                        </div>

                        <div>
                            <p className='fw-bolder'>Upload signature <small>(Size: 300px * 100px)</small> <span className='text-danger'>*</span>  </p>
                            <label htmlFor="signature" className="form-label bg-dark-subtle rounded " style={{ width: "200px", height: "100px" }}><span className='text-danger'><img style={{ height: "100%", width: "100%", objectFit: "cover" }} src='/signature-placeholder.png' /></span></label>
                            <input type="file" hidden name='signature' id="signature" onChange={uploadSignature} />
                        </div>

                    </div>
                </div>
                <div className='text-center'>
                    <button className='btn btn-success' onClick={submit}>Submit</button>
                </div>


                {/* Button trigger modal */}
                <button type="button" className="btn btn-primary d-none" id="locationModelBtn" data-bs-toggle="modal" data-bs-target="#locationModel">
                    location model
                </button>

                {/* Modal */}
                <div className="modal fade" id="locationModel" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="locationModelLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="locationModelLabel">Please enable location.</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <p>Enable location interaction:</p>
                                <ol>
                                    <li>Click on SSL lock</li>
                                    <li>Go to site Settings</li>
                                    <li>Allow location permissions</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>

            </>}


        </div > : <div className="position-absolute top-50 start-50 translate-middle text-danger">This page is expired</div>

    )
}
