"use client"
import React, { useContext, useEffect, useState } from 'react'
import { store, validation } from '../layout'
import { useRouter } from 'next/navigation';

export default function Page() {

    const router = useRouter();

    const [data, setData] = useContext(store)

    const currentDate = new Date().toISOString().substring(0, 10).split("-")[2]

    //get all service end ===========

    // add service data start ==========
    const [addServiceData, setAddServiceData] = useState({});

    const getService = (event) => {
        const filteredService = data.service && data.service.filter(item => item._id === event.target.value)[0];
        setAddServiceData(filteredService)
    }

    const getAddServiceData = (event) => {

        if (event.target.name === "discount" || event.target.name === "mrp" || event.target.name === "gst") {
            setAddServiceData({ ...addServiceData, [event.target.name]: parseInt(event.target.value) })
        } else {
            setAddServiceData({ ...addServiceData, [event.target.name]: event.target.value })
        }
    }


    const [totalService, setTotalService] = useState([])

    const addService = (event) => {
        event.preventDefault();

        setTotalService([...totalService, addServiceData]);

        setAddServiceData({ ...addServiceData, _id: "", mrp: 0, description: "" });

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
        email: "",
        passwordEmail: "",
        emailSubject: ""
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
                    <div className="col-md-6">
                        <label htmlFor="_id" className="form-label">Service {addServiceData.createdAt && parseInt(addServiceData.createdAt.substring(0, 10).split("-")[2]) == parseInt(currentDate) ? <span className='bg-success text-white p-1 rounded'>New</span> : addServiceData.updatedAt && parseInt(addServiceData.updatedAt.substring(0, 10).split("-")[2]) + 3 >= parseInt(currentDate) ? <span className='bg-success text-white p-1 rounded'>Recent Updated</span> : null}</label>
                        <select className="form-select" id="_id" name='_id' value={addServiceData._id} onChange={getService} >
                            <option selected disabled value="">Choose...</option>
                            {
                                data.service && data.service.map(item => <option key={item._id} value={item._id}>{item.name} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {item.createdAt && parseInt(item.createdAt.substring(0, 10).split("-")[2]) == parseInt(currentDate) ? "(New)" : item.updatedAt && parseInt(item.updatedAt.substring(0, 10).split("-")[2]) + 3 >= parseInt(currentDate) ? "(Recent Updated)" : null}</option>)
                            }
                        </select>
                        <div className="invalid-feedback">
                            Please select a valid service.
                        </div>
                    </div>

                    <div className="col-md-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" name='name' value={addServiceData.name} onChange={getAddServiceData} required />
                        <div className="invalid-feedback">
                            Enter name
                        </div>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="mrp" className="form-label">Price</label>
                        <input type="number" className="form-control" id="mrp" name='mrp' value={addServiceData.mrp} onChange={getAddServiceData} required />
                        <div className="invalid-feedback">
                            Enter price
                        </div>
                    </div>

                    <div className="col-md-3">
                        <label htmlFor="gst" className="form-label">GST <small>(in %)</small></label>
                        <input type="number" className="form-control" id="gst" name='gst' value={addServiceData.gst} onChange={getAddServiceData} required />
                        <div className="invalid-feedback">
                            Enter price
                        </div>
                    </div>

                    <div className="col-md-3">
                        <label htmlFor="discount" className="form-label">Discount <small>(in %)</small></label>
                        <select className="form-select" id="discount" name='discount' value={addServiceData.discount} onChange={getAddServiceData} required>
                            <option selected disabled value="">Choose...</option>
                            <option value={0}>0%</option>
                            <option value={1}>1%</option>
                            <option value={2}>2%</option>
                            <option value={3}>3%</option>
                            <option value={4}>4%</option>
                            <option value={5}>5%</option>
                            <option value={6}>6%</option>
                            <option value={7}>7%</option>
                            <option value={8}>8%</option>
                            <option value={9}>9%</option>
                            <option value={10}>10%</option>
                        </select>
                        <div className="invalid-feedback">
                            Please select a valid discount.
                        </div>
                    </div>

                    <div className="col-12 col-md-9">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea rows={5} type="text" className="form-control" id="description" name='description' value={addServiceData.description} onChange={getAddServiceData} required />
                        <div className="invalid-feedback">
                            Enter description
                        </div>
                    </div>

                    <div className="col-12 text-center m-5">
                        <button className="btn btn-primary" onClick={validation} type="submit">Add</button>
                    </div>
                </form>


                <div style={{ minWidth: "1000px" }}>

                    {/* proposal head start */}
                    <div id='proposal-header'>
                        <div className='bg-light' style={{ height: "100px" }}>
                            <div className='ms-4 pt-2 d-flex align-items-center'>
                                <img src="/logo.png" className='rounded-circle' width={80} alt="" />
                                <h1 className='ps-2 m-0 p-0 '>Technic Soft</h1>
                            </div>

                        </div>
                        <div style={{
                            clipPath: "polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%)",
                            width: "500px",
                            height: "110px",
                            backgroundColor: "#0CC0DF",
                            marginTop: "-100px",
                            float: "right",
                        }}>
                            <div className='me-4 pt-4 float-end text-white'>
                                <h5>Reg. No. :- UDYAM-BR-30-0027333</h5>
                                <h5>Mobile No. :- +91 {data.brandInfo && data.brandInfo.number}</h5>

                            </div>
                        </div>
                        <div style={{ backgroundColor: "#0CC0DF", height: "10px" }}></div>
                    </div>
                    {/* proposal head end */}


                    {/* proposal content start */}
                    <div id='proposal-body' >

                        <h4 className='text-start text-uppercase d-inline-block'>Budget for {userData.clientName}</h4>
                        <span className='float-end'>Date : {new Date().toISOString().substring(0, 10).split("-").reverse().join("/")}</span>
                        <table className="table table-striped table-bordered mt-5">
                            <thead>
                                <tr>
                                    <th scope="col">Sr.No.</th>
                                    <th scope="col">Package Name</th>
                                    <th scope="col">Price</th>

                                    {addServiceData.discount !== 0 ? <th scope="col">Discount</th> : null}
                                    {/* {addServiceData.gst !== 0 ? <th scope="col">GST</th> : null} */}
                                    <th scope="col">GST</th>
                                    <th scope="col">Net Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    totalService.map((item, i) => {

                                        return <tr key={i} >
                                            <th scope="row">{i + 1} <button className={`btn btn-danger ms-2 ${userData.serviceDelete}`} onClick={() => deleteService(i)}><i className="bi bi-trash3"></i></button></th>
                                            <td>{item.name}<br /> <span dangerouslySetInnerHTML={{ __html: item.description.replace(/\n/g, '<br>') }} /></td>
                                            <td>{item.mrp.toFixed(2)}</td>
                                            {addServiceData.discount !== 0 ? <td>{(item.mrp * item.discount / 100).toFixed(2)}</td> : null}
                                            {/* {addServiceData.gst !== 0 ? <td>{(((item.mrp - (item.mrp * item.discount / 100)) * item.gst) / 100).toFixed(2)}</td> : null} */}
                                            <td>{(((item.mrp - (item.mrp * item.discount / 100)) * item.gst) / 100).toFixed(2)}</td>
                                            <td>{(item.mrp - (item.mrp * item.discount / 100) + (((item.mrp - (item.mrp * item.discount / 100)) * item.gst) / 100)).toFixed(2)}</td>
                                        </tr>
                                    })
                                }
                            </tbody>
                            <thead>
                                <tr>
                                    <th scope="col" colSpan="2" className='text-center'>Total Price</th>
                                    <th scope="col">{totalService.reduce((totalPrice, service) => { return totalPrice + service.mrp }, 0).toFixed(2)}</th>
                                    {addServiceData.discount !== 0 ? <th scope="col">{totalService.reduce((totalDiscount, service) => { return totalDiscount + (service.mrp * service.discount / 100) }, 0).toFixed(2)}</th> : null}
                                    {/* {addServiceData.gst !== 0 ? <th scope="col">{totalService.reduce((totalGSTPrice, service) => { return totalGSTPrice + (((service.mrp - (service.mrp * service.discount / 100)) * service.gst) / 100) }, 0).toFixed(2)}</th> : null} */}
                                     <th scope="col">{totalService.reduce((totalGSTPrice, service) => { return totalGSTPrice + (((service.mrp - (service.mrp * service.discount / 100)) * service.gst) / 100) }, 0).toFixed(2)}</th>
                                    <th scope="col">{totalService.reduce((totalNetPrice, service) => { return totalNetPrice + (service.mrp - (service.mrp * service.discount / 100) + (((service.mrp - (service.mrp * service.discount / 100)) * service.gst) / 100)) }, 0).toFixed(2)}</th>
                                </tr>
                            </thead>
                        </table>

                        <h4 className='my-2 text-center'>Net Payable Amount: {totalService.reduce((totalNetPrice, service) => { return totalNetPrice + (service.mrp - (service.mrp * service.discount / 100) + (((service.mrp - (service.mrp * service.discount / 100)) * service.gst) / 100)) }, 0).toFixed(2)}</h4>

                        <h6 className='mt-5'>Terms & conditions</h6>
                        <div dangerouslySetInnerHTML={{ __html: data.brandInfo && data.brandInfo.proposalTC }} />

                    </div>
                    {/* proposal content end */}


                    {/* proposal footer start */}
                    <div id='proposal-footer'>
                        <div style={{
                            clipPath: "polygon(0 0, 100% 0%, 75% 100%, 0% 100%)",
                            width: "310px",
                            height: "110px",
                            backgroundColor: "#0CC0DF",
                            marginBottom: "-110px",
                        }}>
                            <div className='ms-4 pt-4'>
                                <a href={`mailto:${data.brandInfo && data.brandInfo.email}`} className=' h5 d-block text-white text-decoration-none'><i className="bi bi-envelope-fill fs-4"></i> {data.brandInfo && data.brandInfo.email}</a>
                                <a href='https://technicsoft.in/' className='text-white h5 text-decoration-none'><i className="bi bi-globe fs-4"></i> technicsoft.in</a>
                            </div>

                        </div>
                        <div style={{ backgroundColor: "#0CC0DF", height: "10px" }}></div>
                        <div className='bg-light' style={{ height: "100px" }}>

                            <div className='row me-4' style={{ marginLeft: "280px", paddingTop: "25px" }}>

                                <div className='col-6 fs-4'>
                                    <a href='https://g.co/kgs/ZfL7o6' className='text-decoration-none mx-2'> <i className="bi bi-google text-dark"></i></a>
                                    <a href='https://www.facebook.com/ValueXdigital/' className='text-decoration-none mx-2'> <i className="bi bi-facebook text-dark"></i></a>
                                    <a href='https://www.instagram.com/valuexdigital/' className='text-decoration-none mx-2'> <i className="bi bi-instagram text-dark"></i></a>
                                    <a href='https://www.linkedin.com/company/valuexdigital' className='text-decoration-none mx-2'> <i className="bi bi-linkedin text-dark"></i></a>
                                    <a href='https://www.youtube.com/channel/UCxPwGKCT7gKtfwORlEXyhpQ' className='text-decoration-none mx-2'><i className="bi bi-youtube text-dark"></i></a>
                                </div>
                                <div className='col-6' dangerouslySetInnerHTML={{ __html: data.brandInfo && data.brandInfo.address }} />

                            </div>
                        </div>
                        {/* proposal footer end */}
                    </div>

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
                        <button className='btn btn-success m-3' type='submit'>Print</button>
                    </div>

                </form>


            </div >

        </>
    )
}
