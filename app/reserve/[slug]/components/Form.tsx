'use client'

import { CircularProgress } from "@mui/material"
import { useEffect, useState } from "react"
import useReservation from "../../../../hooks/useReservation"

export default function Form({
    slug,
    partySize,
    date,

}: {
    slug: string,
    partySize: string,
    date: string,

}
) {
    const [inputs, setInputs] = useState({
        booker_first_name: "",
        booker_last_name: "",
        booker_phone: "",
        booker_email: "",
        booker_occasion: "",
        booker_requests: ""
    })
    const [day, time] = date.split('T')
    const [disabled, setDisabled] = useState(false)
    const [didBook, setDidBook] = useState(false)
    const { error, loading, createReservation } = useReservation()

    useEffect(() => {
        if (inputs.booker_first_name && inputs.booker_last_name && inputs.booker_email && inputs.booker_phone) {
            return setDisabled(false)
        }
        return setDisabled(true)
    }, [inputs])

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value,
        });
    };

    const handleClick = async () => {
        const booking = await createReservation({
            slug,
            partySize,
            time,
            day,
            booker_first_name: inputs.booker_first_name,
            booker_last_name: inputs.booker_last_name,
            booker_email: inputs.booker_email,
            booker_phone: inputs.booker_phone,
            booker_occasion: inputs.booker_occasion,
            booker_requests: inputs.booker_requests,
            setDidBook
        })
    }

    return (
        <div className="mt-10 flex flex-wrap justify-between w-[660px]">
            {didBook ? (<div>
                <h1> You are all booked!</h1>
                <p>Enjoy your reservation</p>
            </div>) : (<><input
                type="text"
                className="border rounded p-3 w-80 mb-4"
                placeholder="First name"
                name='booker_first_name'
                onChange={handleChangeInput}
                value={inputs.booker_first_name}

            />
                <input
                    type="text"
                    className="border rounded p-3 w-80 mb-4"
                    placeholder="Last name"
                    name='booker_last_name'
                    onChange={handleChangeInput}
                    value={inputs.booker_last_name}
                />
                <input
                    type="text"
                    className="border rounded p-3 w-80 mb-4"
                    placeholder="Phone number"
                    name='booker_phone'
                    onChange={handleChangeInput}
                    value={inputs.booker_phone}
                />
                <input
                    type="text"
                    className="border rounded p-3 w-80 mb-4"
                    placeholder="Email"
                    name='booker_email'
                    onChange={handleChangeInput}
                    value={inputs.booker_email}
                />
                <input
                    type="text"
                    className="border rounded p-3 w-80 mb-4"
                    placeholder="Occasion (optional)"
                    name='booker_occasion'
                    onChange={handleChangeInput}
                    value={inputs.booker_occasion}
                />
                <input
                    type="text"
                    className="border rounded p-3 w-80 mb-4"
                    placeholder="Requests (optional)"
                    name='booker_requests'
                    onChange={handleChangeInput}
                    value={inputs.booker_requests}
                />
                <button
                    disabled={disabled || loading}
                    className="bg-red-600 w-full p-3 text-white font-bold rounded disabled:bg-gray-300"
                    onClick={handleClick}
                >
                    {loading ? <CircularProgress color='inherit' /> : "Complete reservation"}
                </button>
                <p className="mt-4 text-sm">
                    By clicking “Complete reservation” you agree to the OpenTable Terms
                    of Use and Privacy Policy. Standard text message rates may apply.
                    You may opt out of receiving text messages at any time.
                </p>
            </>)}
        </div>
    )
}