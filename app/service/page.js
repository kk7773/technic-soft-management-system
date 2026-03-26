"use client"
import React, { useMemo, useState } from 'react'
import { useContext } from 'react'
import { store, validation } from '../layout'
import MaterialReactTable from 'material-react-table'
import { useEffect } from 'react'
import { getService, patchService, postService } from '@/actions/service'

export default function Page() {

    const [data, setData] = useContext(store);

    //add service start =========
    const [addService, setAddService] = useState({
        name: "",
        description: "",
        mrp: 0,
        gst: 18,
        discount: 0
    })

    const getAddService = (event) => {

        if (event.target.name === "mrp" || event.target.name === "gst" || event.target.name === "discount") {
            setAddService({ ...addService, [event.target.name]: parseInt(event.target.value) })
        } else {
            setAddService({ ...addService, [event.target.name]: event.target.value })
        }

    }

    const submit = async (event) => {
        event.preventDefault()

        const service = await postService(addService)

        const newService = [...data.service]
        newService.push(service)

        setData({ ...data, service: newService })

        setAddService({})

        event.target.reset()
    }
    //add service end =========

    //show service start =======
    const tableColumns = useMemo(
        () => [
            {
                accessorKey: 'name',
                header: 'Name',
            },
            {
                accessorKey: 'description',
                header: 'Description',
            },
            {
                accessorKey: 'mrp',
                header: 'MRP'
            },
            {
                accessorKey: 'gst',
                header: 'GST'
            },
            {
                accessorKey: 'discount',
                header: 'Discount'
            },
            {
                accessorKey: 'action',
                header: 'Action'
            }
        ],
        [],
    );

    const [tableData, setTableData] = useState([])

    const fetchService = () => {
        if (data.service) {
            const { service } = data

            service.forEach((item, i) => {
                item.i = i
                item.action = <button type='button' className='btn btn-warning' data-bs-toggle="modal" data-bs-target="#adminEdit" onClick={() => edit(item)}>Edit</button>
            })

            setTableData(service)
        }
    }

    useEffect(() => {

        fetchService()

    }, [data])

    // show service end =======

    //edit service start ======
    const [editData, setEditData] = useState({})
    const [updateData, setUpdateData] = useState({})

    const edit = (item) => {
        setEditData(item)
    }

    const getUpdate = (event) => {
        setUpdateData({ ...updateData, [event.target.name]: event.target.value })
        setEditData({ ...editData, [event.target.name]: event.target.value })
    }

    const update = async (event) => {
        event.preventDefault();

        const service = await patchService(editData._id, updateData)
        setUpdateData({})
        document.getElementById("admin-edit-btn-close").click();

        const newService = [...data.service]
        newService[editData.i] = service

        setData({ ...data, service: newService })
    }
    //edit service end ======

    return (

        <div className='container'>

            {/* <div className="position-absolute top-50 start-50 translate-middle">
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
            </div> */}

            <form onSubmit={submit} className="row my-5 g-3 needs-validation" noValidate>
                <h3>Add New Service</h3>
                <div className="col-md-4">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name='name' onChange={getAddService} required />
                    <div className="invalid-feedback">
                        Please enter name
                    </div>
                </div>

                <div className="col-md-2">
                    <label htmlFor="mrp" className="form-label">MRP</label>
                    <input type="number" className="form-control" id="mrp" min={0} name='mrp' value={addService.mrp} onChange={getAddService} required />
                    <div className="invalid-feedback">
                        Please enter mrp
                    </div>
                </div>

                <div className="col-md-2">
                    <label htmlFor="gst" className="form-label">GST (in %)</label>
                    <input type="number" className="form-control" id="gst" min={0} name='gst' value={addService.gst} onChange={getAddService} required />
                    <div className="invalid-feedback">
                        Please enter gst
                    </div>
                </div>

                <div className="col-md-3">
                    <label htmlFor="discount" className="form-label">Discount (in %)</label>
                    <input type="number" className="form-control" id="discount" min={0} name='discount' value={addService.discount} onChange={getAddService} required />
                    <div className="invalid-feedback">
                        Please enter discount
                    </div>
                </div>

                <div className="col-md-6">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea rows={5} type="text" className="form-control" id="description" name='description' onChange={getAddService} required />
                    <div className="invalid-feedback">
                        Please enter description
                    </div>
                </div>

                <div className="col-12">
                    <button className="btn btn-primary" onClick={validation} type="submit">Submit</button>
                </div>
            </form>

            <h3>All Admin</h3>
            <MaterialReactTable columns={tableColumns} data={tableData} />


            {/* Modal */}
            <div className="modal fade" id="adminEdit" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="adminEditLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="adminEditLabel">Edit Admin</h1>
                            <button type="button" id='admin-edit-btn-close' className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={update} className="row g-3 needs-validation" noValidate>
                                <div className="col-12">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input type="text" className="form-control" id="name" name='name' value={editData.name} onChange={getUpdate} required />
                                    <div className="invalid-feedback">
                                        Please enter name
                                    </div>
                                </div>

                                <div className="col-6">
                                    <label htmlFor="mrp" className="form-label">MRP</label>
                                    <input type="number" className="form-control" id="mrp" name='mrp' min={0} value={editData.mrp} onChange={getUpdate} required />
                                    <div className="invalid-feedback">
                                        Please enter mrp
                                    </div>
                                </div>

                                <div className="col-6">
                                    <label htmlFor="gst" className="form-label">GST (in %)</label>
                                    <input type="number" className="form-control" id="gst" name='gst' min={0} value={editData.gst} onChange={getUpdate} required />
                                    <div className="invalid-feedback">
                                        Please enter gst
                                    </div>
                                </div>

                                <div className="col-6">
                                    <label htmlFor="discount" className="form-label">Discount (in %)</label>
                                    <input type="number" className="form-control" id="discount" name='discount' min={0} value={editData.discount} onChange={getUpdate} required />
                                    <div className="invalid-feedback">
                                        Please enter discount
                                    </div>
                                </div>

                                <div className="col-12">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea rows={5} type="text" className="form-control" id="description" name='description' value={editData.description} onChange={getUpdate} required />
                                    <div className="invalid-feedback">
                                        Please enter description
                                    </div>
                                </div>

                                <div className="col-12">
                                    <button className="btn btn-primary" onClick={validation} type="submit">Update</button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>

        </div>

    )
}
