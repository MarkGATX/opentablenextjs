import { Dispatch, SetStateAction, useState } from "react";
import axios from "axios";

export default function useReservation() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const createReservation = async ({
        slug,
        partySize,
        day,
        time,
        booker_first_name,
        booker_last_name,
        booker_email,
        booker_phone,
        booker_occasion,
        booker_requests,
        setDidBook
    }: {
        slug: string,
        partySize: string,
        day: string,
        time: string,
        booker_first_name: string,
        booker_last_name: string,
        booker_phone: string,
        booker_email: string,
        booker_occasion: string,
        booker_requests: string,
        setDidBook: Dispatch<SetStateAction<boolean>>
    }) => {
        setLoading(true);

        try {
            const response = await axios.post(`http://localhost:3000/api/restaurant/${slug}/reserve`, {
                booker_first_name,
                booker_last_name,
                booker_phone,
                booker_occasion,
                booker_requests,
                booker_email
            }, {
                params: {
                    day,
                    time,
                    partySize
                }
            }
            );
            setLoading(false);
            setDidBook(true);
            return response.data
        } catch (error: any) {
            setLoading(false);
            setError(error.response.data.errorMessage)

        }
    }
    return { loading, error, createReservation }

}