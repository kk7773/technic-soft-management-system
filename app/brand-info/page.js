"use client"
import { getBrandInfo, updateBrandInfo } from '@/actions/brandInfo'
import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { toast } from 'react-toastify'
import { store } from '../layout'
import dynamic from 'next/dynamic';

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

export default function Page() {

    const [data, setData] = useContext(store)

    const [brandData, setBrandData] = useState({
        name: "",
        number: "",
        email: "",
        address: "",
        companyName: "",
        signature: "",
    })
    const [disabled, setDisabled] = useState(true);
    const [update, setUpdate] = useState({});

    const edit = () => {
        setDisabled(!disabled)
    }

    useEffect(() => {

        if (data.brandInfo) {
            setBrandData(data.brandInfo)
        }

    }, [data])

    const onChangeHandler = (event) => {
        setBrandData({ ...brandData, [event.target.name]: event.target.value })
        setUpdate({ ...update, [event.target.name]: event.target.value })
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        if (!disabled) {

            await updateBrandInfo(brandData._id, update)

            setDisabled(!disabled)

            getBrandInfo()

        } else {
            toast.error("Please enable editing mode", {
                position: "top-center",

            });
        }
    }


    return (
        <>
            <div className='w-100'>
                <div className='container pt-4'>
                    <h2>Brand Information</h2>
                    <hr />
                    <form className="row  g-3 p-5 needs-validation" onSubmit={onSubmitHandler} noValidate>
                        <div className="col-md-6">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="name" className="form-control" id="name" name='name' value={brandData.name} onChange={onChangeHandler} required disabled={disabled} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputEmail4" className="form-label">Email</label>
                            <input type="email" className="form-control" id="inputEmail4" name='email' value={brandData.email} onChange={onChangeHandler} required disabled={disabled} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="number" className="form-label">Mobile Number</label>
                            <input type="text" className="form-control" id="number" name='number' value={brandData.number} onChange={onChangeHandler} required disabled={disabled} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="companyName" className="form-label">Company Name</label>
                            <input type="name" className="form-control" id="companyName" name='companyName' value={brandData.companyName} onChange={onChangeHandler} required disabled={disabled} />
                        </div>
                        <div className="col-12">
                            <label htmlFor="inputAddress" className="form-label">Address</label>
                            <input type="text" className="form-control" id="inputAddress" name='address' value={brandData.address} onChange={onChangeHandler} required disabled={disabled} />
                        </div>

                        <div className="col-12">
                            <label className="form-label">Proposal T&C</label>
                            <JoditEditor
                                value={brandData.proposalTC}
                                onChange={content => setUpdate({ ...update, proposalTC: content })}
                            />
                        </div>

                        <div className="col-12">
                            <label className="form-label">Ads Proposal T&C</label>
                            <JoditEditor
                                value={brandData.adsProposalTC}
                                onChange={content => setUpdate({ ...update, adsProposalTC: content })}
                            />
                        </div>




                        <div className="col-12">
                            <button type="submit" className="btn btn-success">Update</button>
                        </div>

                    </form>

                </div>
                <div className="col-3 mx-auto ">
                    <button type="submit" className="btn btn-warning" onClick={edit}><i className="bi bi-pencil-square me-2"></i>{disabled ? 'Enable Editing' : 'Disable Editing'}</button>
                </div>
            </div>
        </>
    )
}

