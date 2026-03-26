'use client'
import React, { useContext, useEffect, useRef } from 'react'
import { store } from '../layout';
import ReactToPrint from 'react-to-print';
import { useRouter } from 'next/navigation';

export default function Page() {

    const proposalRef = useRef();

    const router = useRouter()

    const [data, setData] = useContext(store);

    useEffect(() => {

        document.getElementById("print").click()

        router.back()
    }, [])
   

    return (
        <div ref={proposalRef} style={{ height: "100%", width: "100%", margin: "5px !important" }}>
            <style>{`@page { margin: 20px !important; }`}</style>
            <table className='mx-auto'>
                <thead><tr><td>
                    <div className="header-space" style={{ height: "100px", marginTop: "80px" }}>&nbsp;</div>
                </td></tr></thead>
                <tbody><tr><td>
                    <div className="content mx-4" dangerouslySetInnerHTML={{ __html: data.proposalBody }} />

                </td></tr></tbody>
                <tfoot><tr><td>
                    <div className="footer-space" style={{ height: "100px", marginBottom: "80px" }}>&nbsp;</div>
                </td></tr></tfoot>
            </table>
            <div className="header w-100" style={{ position: "fixed", top: 0, height: "100px" }} dangerouslySetInnerHTML={{ __html: data.proposalHeader }} />

            <div className="footer w-100" style={{ position: "fixed", bottom: 0, height: "100px" }} dangerouslySetInnerHTML={{ __html: data.proposalFooter }} />
            <ReactToPrint
                trigger={() => <button type='button' id='print' className='btn btn-success d-none' >Print</button>}
                content={() => proposalRef.current}
                documentTitle=""
                onPrintError={(er) => console.log(er)}
            />
        </div>
    )
}
