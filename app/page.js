
'use client'
import { adminLogin } from '@/actions/admin';
import { useRouter } from 'next/navigation';
import React, {  useState } from 'react'
import { ThreeCircles } from 'react-loader-spinner';



export default function Page() {

    const router = useRouter();

    const [data, setData] = useState([])

    const [loader, setLoader] = useState(false)

    const [user, setUser] = useState({
        username: "",
        password: ""
    })

    const getUserData = (event) => {
        setUser({ ...user, [event.target.name]: event.target.value })
    }

    const login = async (event) => {
        event.preventDefault();
        setLoader(true)
        const userData = await adminLogin(user);

        setLoader(false)
        localStorage.setItem("userData", JSON.stringify(userData))

        setData({ ...data, userData });

        if (userData) {
            window.location.reload();
            router.push('/dashboard')
        }

    }

    const [showPassword, setShoePassword] = useState(false)

    const handelPAssword = () => {
        setShoePassword(!showPassword)
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
        <div className='mx-auto bg-light p-5 mt-5 rounded-5' style={{ maxWidth: "500px" }}>
            <h2 className='text-center'>Admin Login</h2>
            <form onSubmit={login} className="row g-3 needs-validation" noValidate>

                <div className="col-12">
                    <label htmlFor="username" className="form-label">Username</label>
                    <div className="input-group has-validation">
                        <span className="input-group-text" id="usernamePrepend"><i className="bi bi-person-circle"></i></span>
                        <input type="text" className="form-control" id="username" name='username' aria-describedby="usernamePrepend" onChange={getUserData} required />
                        <div className="invalid-feedback">
                            Please enter username.
                        </div>
                    </div>
                </div>

                <div className="col-12">
                    <label htmlFor="password" className="form-label">Password</label>
                    <div className="input-group has-validation">
                        <span className="input-group-text" id="passwordPrepend"><i className="bi bi-lock-fill"></i></span>
                        <input type={showPassword ? "text" : "password"} className="form-control" name='password' id="password" aria-describedby="passwordPrepend" onChange={getUserData} required />
                        <span className="input-group-text fs-5" onClick={handelPAssword} id="passwordPrepend"><i className={showPassword ? "bi bi-eye-fill" : "bi bi-eye-slash-fill"}></i></span>
                        <div className="invalid-feedback">
                            Please password.
                        </div>
                    </div>
                </div>
                <div className="col-12 text-center">
                    <button className="btn btn-success" type="submit">Login</button>
                </div>
            </form>
        </div>

    )
}



