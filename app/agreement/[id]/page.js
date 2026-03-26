
"use client"
import { getClientAgreement, getClientAgreementbyId, patchClientAgreement } from '@/actions/clientAgreement'
import axios from '@/helper/axiosConfig'
import React, { useEffect, useRef, useState } from 'react'
import ReactToPrint from 'react-to-print'
import { toast } from 'react-toastify'
import SignatureCanvas from 'react-signature-canvas'
import {
    EmailShareButton,
    EmailIcon
} from "react-share";
import { usePathname, useRouter } from 'next/navigation'
import { getBrandInfo } from '@/actions/brandInfo'
import { getAgreementById, updateAgreement } from '@/actions/agreement'




export default function Page({ params }) {


    const [agreement, setAgreement] = useState({})


    const [brandInfo, setBrandInfo] = useState({})



    useEffect(() => {

        const getData = async () => {

            try {
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

            } catch (error) {
                console.log(error)
            }
        }
        getData()
    }, [])




    return (
        <>

            <div className='container my-5'>
                <div dangerouslySetInnerHTML={{ __html: agreement.agreementType && agreement.agreementType.agreementText }} />

                {
                    agreement.agreementType && <div className='d-flex justify-content-around'>
                        <div>
                            <b>Party 1</b>
                            <p>Name : {agreement.agreementType.party1.name}</p>
                            <img src={agreement.agreementType.party1.signature} alt="sign" />
                        </div>
                        <div>
                            <b>Party 2</b>
                            <p>Name : {agreement.party2.name}</p>
                            <img src={agreement.party2.signature} alt="sign" />
                        </div>
                    </div>
                }
            </div >

        </>
    )
}


