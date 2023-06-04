'use client'

import axios from "axios"
import { useContext } from "react";

const useAuth = () => {


    const signin = async ({ email, password }: { email: string; password: string }) => {
        try {
            const response = await axios.post("http://localhost:3000/api/auth/signin", {
                email,
                password
            })
            console.log(response);
        } catch (error) {
            console.log(error)

        }
    }
    const signup = async () => {

    }

    return {
        signin,
        signup
    }
}

export default useAuth