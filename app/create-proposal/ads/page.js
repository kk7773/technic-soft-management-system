"use client"
import React, { useContext, useEffect, useState } from 'react'
import { onlyNumber, store, validation } from '../../layout'
import { useRouter } from 'next/navigation';


export default function Page() {

    const [data, setData] = useContext(store);

    const router = useRouter()

    // add service data start ==========
    const [addServiceData, setAddServiceData] = useState({
        type: "",
        budgetPerDay: 0,
        noOfDays: 0,
        advertisment: 0,
        gstPrice: 0,
        adsSpentPrice: 0,
        agencyFee: 9999,
        netPrice: 0,

    });


    const getAddServiceData = (event) => {
        setAddServiceData({ ...addServiceData, [event.target.name]: event.target.value })

    }

    useEffect(() => {

    }, [addServiceData])


    const calculateBudget = () => {

        let agencyFee = 0

        if (parseInt(addServiceData.noOfDays) > 0 && parseInt(addServiceData.noOfDays) <= 30) {
            agencyFee = 9999
        } else if (parseInt(addServiceData.noOfDays) > 30 && parseInt(addServiceData.noOfDays) <= 60) {
            agencyFee = 19999
        } else if (parseInt(addServiceData.noOfDays) > 60 && parseInt(addServiceData.noOfDays) <= 90) {
            agencyFee = 29999
        } else if (parseInt(addServiceData.noOfDays) > 90 && parseInt(addServiceData.noOfDays) <= 120) {
            agencyFee = 39999
        } else if (parseInt(addServiceData.noOfDays) > 120 && parseInt(addServiceData.noOfDays) <= 150) {
            agencyFee = 49999
        } else {
            agencyFee = 59999
        }

        const advertisment = addServiceData.budgetPerDay * addServiceData.noOfDays
        const gstPrice = (advertisment * 18) / 100
        const adsSpentPrice = (advertisment + gstPrice) * 10 / 100
        const netPrice = adsSpentPrice + agencyFee + advertisment + gstPrice

        setAddServiceData({ ...addServiceData, advertisment, gstPrice, adsSpentPrice, netPrice, agencyFee })

    }


    const [totalService, setTotalService] = useState([])




    const addService = (event) => {
        event.preventDefault();

        setTotalService([...totalService, addServiceData]);

        setAddServiceData({
            type: "",
            budgetPerDay: 0,
            noOfDays: 0,
            advertisment: 0,
            gstPrice: 0,
            adsSpentPrice: 0,
            agencyFee: 9999,
            netPrice: 0,

        });
    }

    const deleteService = (i) => {
        const newTotalService = [...totalService]
        newTotalService.splice(i, 1)
        setTotalService(newTotalService)
    }

    // add service data end ==========

    const [userData, setUserData] = useState({
        clientName: "",
        serviceDelete: "",
        emailId: "",
        passwordEmail: "",
        emailSubject: "",
    })


    const getUserData = (event) => {
        setUserData({ ...userData, [event.target.name]: event.target.value })
    }

    const print = async (event) => {
        event.preventDefault();
        await setUserData({ ...userData, serviceDelete: "d-none" })
        const proposalHeader = document.getElementById("proposal-header");
        const proposalFooter = document.getElementById("proposal-footer");
        const proposalBody = document.getElementById("proposal-body");

        setData({ ...data, proposalHeader: proposalHeader.innerHTML, proposalFooter: proposalFooter.innerHTML, proposalBody: proposalBody.innerHTML })

        router.push('/print-proposal')

    }


    return (
        <>
            <div className='container my-5'>
                <form onSubmit={addService} className="row g-3 needs-validation" noValidate>
                    <div className="col-md-4">
                        <label htmlFor="type" className="form-label">Ads Type</label>
                        <select className="form-select" id="type" name='type' value={addServiceData.type} onChange={getAddServiceData} required>
                            <option selected disabled value="">Choose...</option>
                            <option value="Meta Ads Budget (Leads)">Meta Ads Budget (Leads)</option>
                            <option value="Google Ads Budget (leads)">Google Ads Budget (leads)</option>
                            <option value="Meta Ads Budget (Ecom)">Meta Ads Budget (Ecom)</option>
                            <option value="Google Ads Budget (Ecom)">Google Ads Budget (Ecom)</option>
                        </select>
                        <div className="invalid-feedback">
                            Please select a valid state.
                        </div>
                    </div>

                    <div className="col-md-3">
                        <label htmlFor="budgetPerDay" className="form-label">Ads Budget Per day </label>
                        <input type="tel" className="form-control" id="budgetPerDay" name='budgetPerDay' onKeyDown={onlyNumber} value={addServiceData.budgetPerDay} onChange={getAddServiceData} onBlur={calculateBudget} required />
                        <div className="invalid-feedback">
                            Enter budget per day
                        </div>
                    </div>

                    <div className="col-md-3">
                        <label htmlFor="noOfDays" className="form-label">No. Of Days</label>
                        <input type="tel" className="form-control" id="noOfDays" name='noOfDays' onKeyDown={onlyNumber} value={addServiceData.noOfDays} onChange={getAddServiceData} onBlur={calculateBudget} required />
                        <div className="invalid-feedback">
                            Enter no of days
                        </div>
                    </div>

                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">Ads Name</th>
                                <th scope="col">Ads Budget Per day </th>
                                <th scope="col">No.of days </th>
                                <th scope="col">Advertisment</th>
                                <th scope="col">GST</th>
                                <th scope="col">10% Ads Spent</th>
                                <th scope="col">Agency Fee</th>
                                <th scope="col">Net Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td scope="row">{addServiceData.type}</td>
                                <td scope="row">{addServiceData.budgetPerDay}</td>
                                <td scope="row">{addServiceData.noOfDays}</td>
                                <td scope="row">{addServiceData.advertisment.toFixed(2)}</td>
                                <td scope="row">{addServiceData.gstPrice.toFixed(2)}</td>
                                <td scope="row">{addServiceData.adsSpentPrice.toFixed(2)}</td>
                                <td scope="row">{addServiceData.agencyFee.toFixed(2)}</td>
                                <td scope="row">{addServiceData.netPrice.toFixed(2)}</td>

                            </tr>
                        </tbody>
                    </table>
                    <div className="col-12 text-center mb-3">
                        <button className="btn btn-success" onClick={validation} type="submit">Add</button>
                    </div>
                </form>


                <div style={{ minWidth: "1000px" }}>
                    {/* proposal head start */}
                    <div id='proposal-header'>
                        <div className='bg-dark' style={{ height: "100px" }}>
                            <div className='ms-3 pt-2 d-flex align-items-center'>
                                <img src="/logo.png" width={80} alt="" />
                                <h1 className='text-white ps-2 m-0 p-0'>ValueX Digital Pvt. Ltd.</h1>
                            </div>

                        </div>
                        <div style={{
                            WebkitClipPath: "polygon(12% 4%, 100% 1%, 100% 100%, 12% 100%, 0% 50%)",
                            clipPath: "polygon(12% 4%, 100% 1%, 100% 100%, 12% 100%, 0% 50%)",
                            width: "310px",
                            height: "80px",
                            backgroundColor: "#61cebf",
                            marginTop: "-35px",
                            float: "right",
                        }}>
                            <div className='ms-5'>
                                <p className='pt-2'>CIN - U74999MP2022PTC059217</p>
                                <p>GST - 23AAICV5083B1ZI</p>
                            </div>
                        </div>
                        <div style={{ backgroundColor: "#61cebf", height: "10px" }}></div>
                    </div>
                    {/* proposal head end */}


                    {/* proposal content start */}
                    <div id='proposal-body'>
                        <h4 className='text-center'>DIGITAL MARKETING SERVICES BUDGET FOR {userData.clientName}</h4>
                        <table className="table table-striped table-bordered mt-5">
                            <thead>
                                <tr>
                                    <th scope="col">Sr.No.</th>
                                    <th scope="col">Ads Name</th>
                                    <th scope="col">Ads Budget Per Day </th>
                                    <th scope="col">No.of days </th>
                                    <th scope="col">Advertisment</th>
                                    <th scope="col">GST</th>
                                    <th scope="col">10% Ads Spent</th>
                                    <th scope="col">Agency Fee</th>
                                    <th scope="col">Net Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    totalService.map((item, i) => {

                                        return <tr key={i}>
                                            <th scope="row">{i + 1} <button className={`btn btn-danger ms-2 ${userData.serviceDelete}`} onClick={() => deleteService(i)}><i className="bi bi-trash3"></i></button></th>
                                            <td>{item.type}</td>
                                            <td>{parseInt(item.budgetPerDay).toFixed(2)}</td>
                                            <td>{parseInt(item.noOfDays).toFixed(2)}</td>
                                            <td>{item.advertisment.toFixed(2)}</td>
                                            <td>{item.gstPrice.toFixed(2)}</td>
                                            <td>{item.adsSpentPrice.toFixed(2)}</td>
                                            <td>{item.agencyFee.toFixed(2)}</td>
                                            <td>{item.netPrice.toFixed(2)}</td>

                                        </tr>
                                    })
                                }
                            </tbody>
                            <thead>
                                <tr>
                                    <th scope="col" colSpan="4" className='text-center'>Total Price</th>
                                    <th scope="col">{totalService.reduce((totalAdvertisement, service) => { return totalAdvertisement + service.advertisment }, 0).toFixed(2)}</th>
                                    <th scope="col">{totalService.reduce((totalGSTPrice, service) => { return totalGSTPrice + service.gstPrice }, 0).toFixed(2)}</th>
                                    <th scope="col">{totalService.reduce((totalAdsSpentPrice, service) => { return totalAdsSpentPrice + service.adsSpentPrice }, 0).toFixed(2)}</th>
                                    <th scope="col">{totalService.reduce((totalAgencyFee, service) => { return totalAgencyFee + service.agencyFee }, 0).toFixed(2)}</th>
                                    <th scope="col">{totalService.reduce((totalNetPrice, service) => { return totalNetPrice + service.netPrice }, 0).toFixed(2)}</th>
                                </tr>
                            </thead>
                        </table>



                        <h4 className='my-2 text-center'>Net Payable Amount: {totalService.reduce((totalNetPrice, service) => { return totalNetPrice + service.netPrice }, 0).toFixed(2)}</h4>

                        <h6 className='mt-5'>Terms & conditions</h6>
                        <div dangerouslySetInnerHTML={{__html: data.brandInfo && data.brandInfo.adsProposalTC}}/>  
                    </div>
                    {/* proposal content end */}


                    {/* proposal footer start */}
                    <div id='proposal-footer'>
                        <div style={{
                            WebkitClipPath: "polygon(0% 0%, 90% 0, 100% 50%, 90% 100%, 0% 100%)",
                            clipPath: "polygon(0% 0%, 90% 0, 100% 50%, 90% 100%, 0% 100%)",
                            width: "310px",
                            height: "80px",
                            backgroundColor: "#61cebf",
                            marginBottom: "-45px",
                        }}>
                            <div className='ms-5'>
                                <a href={`tel:91${data.brandInfo && data.brandInfo.number}`} className='pt-2 d-block text-dark text-decoration-none'><i className="bi bi-telephone-inbound-fill fs-5"></i> +91 {data.brandInfo && data.brandInfo.number}</a>
                                <a href={`mailto:${data.brandInfo && data.brandInfo.email}`} className='d-block text-dark text-decoration-none'><i className="bi bi-envelope-fill fs-5"></i> {data.brandInfo && data.brandInfo.email}</a>
                            </div>

                        </div>
                        <div style={{ backgroundColor: "#61cebf", height: "10px" }}></div>
                        <div className='bg-dark' style={{ height: "120px" }}>

                            <div className='pt-5 d-flex justify-content-evenly'>
                                <a href='' className='text-white text-dark text-decoration-none'><i className="bi bi-globe fs-5"></i> valuexdigital.com</a>
                                <div className='ms-5 fs-4'>
                                    <a href='https://g.co/kgs/ZfL7o6' className='text-decoration-none mx-2'> <i className="bi bi-google text-white"></i></a>
                                    <a href='https://www.facebook.com/ValueXdigital/' className='text-decoration-none mx-2'> <i className="bi bi-facebook text-white"></i></a>
                                    <a href='https://www.instagram.com/valuexdigital/' className='text-decoration-none mx-2'> <i className="bi bi-instagram text-white"></i></a>
                                    <a href='https://www.linkedin.com/company/valuexdigital' className='text-decoration-none mx-2'> <i className="bi bi-linkedin text-white"></i></a>
                                    <a href='https://www.youtube.com/channel/UCxPwGKCT7gKtfwORlEXyhpQ' className='text-decoration-none mx-2'><i className="bi bi-youtube text-white"></i></a>
                                </div>
                                <div className='text-white' dangerouslySetInnerHTML={{ __html: data.brandInfo && data.brandInfo.address }} />
                            </div>
                        </div>
                    </div>
                    {/* proposal footer end */}

                </div>
                <form onSubmit={print} className="row g-3 mt-4 needs-validation" noValidate>

                    <div className="col-md-4">
                        <label htmlFor="clientName" className="form-label">Client Name</label>
                        <input type="text" className="form-control" id="clientName" name='clientName' value={userData.clientName} onChange={getUserData} required />
                        <div className="invalid-feedback">
                            Enter client name
                        </div>
                    </div>

                    <div className='col-12 text-center'>
                        <button className='btn btn-success m-3' type='submit' >Print</button>
                    </div>
                </form>
            </div >

        </>
    )
}
