"use client"
import { getAdmin, patchAdmin, postAdmin } from '@/actions/admin'
import MaterialReactTable from 'material-react-table'
import React, { useEffect, useMemo, useState } from 'react'
import { store, validation } from '../layout'
import { useContext } from 'react'

export default function Page() {

  const [tableData, setTableData] = useState([])

  const [data, setData] = useContext(store)

  const fetchAdmin = async () => {
    const admin = await getAdmin();

    admin.forEach((item) => {
      item.action = <button type='button' className='btn btn-warning' data-bs-toggle="modal" data-bs-target="#adminEdit" onClick={() => edit(item)}>Edit</button>
      item.permissionValue = item.permission.map((value, i) => <p key={i}>{value}</p>)
    })

    setTableData(admin)
  }

  useEffect(() => {
    fetchAdmin()
  }, [])

  const tableColumns = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
      },
      {
        accessorKey: 'username',
        header: 'Username',
      },
      {
        accessorKey: 'permissionValue',
        header: 'Permission'
      },
      {
        accessorKey: 'action',
        header: 'Action'
      }
    ],
    [],
  );


  const [showPassword, setShoePassword] = useState(false)

  const handelPAssword = () => {
    setShoePassword(!showPassword)
  }


  const [user, setUser] = useState({
    name: "",
    username: "",
    password: "",
    permission: []
  })


  const getUser = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value })
  }

  const getPermission = (event) => {

    if (event.target.checked) {
      setUser({
        ...user, permission: [...user.permission, event.target.value]
      })
    } else {
      const permission = user.permission.filter(item => item !== event.target.value);
      setUser({ ...user, permission })
    }
  }
  const submit = async (event) => {
    event.preventDefault()
    user.brandInfo = data.userData && data.userData.brandInfo
    await postAdmin(user)
    fetchAdmin()

    event.target.reset()
  }

  //admin edit start============

  const [editData, setEditData] = useState({})
  const [updateData, setUpdateData] = useState({})

  const edit = (item) => {
    setEditData(item)
    setUpdateData({ ...updateData, permission: item.permission })
  }



  const getUpdate = (event) => {
    setUpdateData({ ...updateData, [event.target.name]: event.target.value })
    setEditData({ ...editData, [event.target.name]: event.target.value })
  }

  const getUpdatePermission = (event) => {

    if (event.target.checked) {
      setUpdateData({
        ...updateData, permission: [...updateData.permission, event.target.value]
      })
      setEditData({
        ...editData, permission: [...editData.permission, event.target.value]
      })
    } else {
      const permission = editData.permission.filter(item => item !== event.target.value);

      setEditData({ ...editData, permission })
      setUpdateData({ ...updateData, permission })
    }

  }

  const update = async (event) => {
    event.preventDefault();

    await patchAdmin(editData._id, updateData)
    setUpdateData({})
    document.getElementById("admin-edit-btn-close").click();
    fetchAdmin()
  }
  //admin edit end============

  return (
    <div className='container'>
      <form onSubmit={submit} className="row my-5 g-3 needs-validation" noValidate>
        <h3>Create New Admin</h3>
        <div className="col-md-4">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name='name' onChange={getUser} required />
          <div className="invalid-feedback">
            Please enter name
          </div>
        </div>

        <div className="col-md-4">
          <label htmlFor="username" className="form-label">Username</label>
          <div className="input-group has-validation">
            <span className="input-group-text" id="usernameGroupPrepend"><i className="bi bi-person-circle"></i></span>
            <input type="text" className="form-control" id="username" name='username' onChange={getUser} aria-describedby="usernameGroupPrepend" required />
            <div className="invalid-feedback">
              Please enter username.
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <label htmlFor="password" className="form-label">Password</label>
          <div className="input-group has-validation">
            <span className="input-group-text" id="passwordGroupPrepend"><i className="bi bi-lock-fill"></i></span>
            <input type={showPassword ? "text" : "password"} className="form-control" id="password" name='password' onChange={getUser} aria-describedby="passwordGroupPrepend" required />
            <span className="input-group-text" onClick={handelPAssword} id="passwordGroupPrepend"><i className={showPassword ? "bi bi-eye-fill" : "bi bi-eye-slash-fill"}></i></span>
            <div className="invalid-feedback">
              Please enter password.
            </div>
          </div>
        </div>

        <label>Permission</label>
        <div className="col-12">
          <div className='d-flex gap-5'>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="super-admin" onChange={getPermission} id="super-admin" />
              <label className="form-check-label" htmlFor="super-admin">
                Super-admin
              </label>
            </div>

            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="proposal" onChange={getPermission} id="proposal" />
              <label className="form-check-label" htmlFor="proposal">
                Proposal
              </label>
            </div>
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
                  <label htmlFor="name-edit" className="form-label">Name</label>
                  <input type="text" className="form-control" id="name-edit" name='name' value={editData.name} onChange={getUpdate} required />
                  <div className="invalid-feedback">
                    Please enter name
                  </div>
                </div>

                <div className="col-12">
                  <label htmlFor="username-edit" className="form-label">Username</label>
                  <div className="input-group has-validation">
                    <span className="input-group-text" id="usernameGroupPrepend"><i className="bi bi-person-circle"></i></span>
                    <input type="text" className="form-control" id="username-edit" name='username' value={editData.username} onChange={getUpdate} aria-describedby="usernameGroupPrepend" required />
                    <div className="invalid-feedback">
                      Please enter username.
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <label htmlFor="password-edit" className="form-label">Password</label>
                  <div className="input-group has-validation">
                    <span className="input-group-text" id="passwordGroupPrepend"><i className="bi bi-lock-fill"></i></span>
                    <input type={showPassword ? "text" : "password"} className="form-control" name='password' id="password-edit" value={editData.password} onChange={getUpdate} aria-describedby="passwordGroupPrepend" required />
                    <span className="input-group-text" onClick={handelPAssword} id="passwordGroupPrepend"><i className={showPassword ? "bi bi-eye-fill" : "bi bi-eye-slash-fill"}></i></span>
                    <div className="invalid-feedback">
                      Please enter password.
                    </div>
                  </div>
                </div>

                <label>Permission</label>

                <div className="form-check col-4">
                  <input className="form-check-input" type="checkbox" value="super-admin" checked={editData.permission && editData.permission.includes("super-admin")} onChange={getUpdatePermission} id="super-admin-edit" />
                  <label className="form-check-label" htmlFor="super-admin-edit">
                    Super-admin
                  </label>
                </div>

                <div className="form-check col-4">
                  <input className="form-check-input" type="checkbox" value="proposal" checked={editData.permission && editData.permission.includes("proposal")} onChange={getUpdatePermission} id="proposal-edit" />
                  <label className="form-check-label" htmlFor="proposal-edit">
                    Proposal
                  </label>
                </div>


                <div className="col-12">
                  <button className="btn btn-primary" onClick={validation} type="submit">Submit</button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>

    </div>
  )
}
