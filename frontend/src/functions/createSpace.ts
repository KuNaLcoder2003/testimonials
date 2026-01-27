const BACKEND_URL = `${import.meta.env.VITE_BACKEND_URL}`
console.log(BACKEND_URL)
const createSpace = async (formData: FormData) => {
    let err: string = ""
    let message: string = ""
    if (!formData) {
        console.log(1)
        err = "Data empty"
        return { err, message }
    }
    const token = localStorage.getItem('token') as string
    if (!token) {
        console.log(2)
        err = "Invalid request"
        return { err, message }
    }
    try {
        console.log(3)
        const response = await fetch(`${BACKEND_URL}/space/newSpace`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        })
        console.log(4)
        const data = await response.json()
        if (!data.valid) {
            console.log(5)
            err = data.message;
        } else {
            console.log(6)
            message = data.message
        }

    } catch (error) {
        console.log(7)
        err = "Something went wrong"
        console.log(error)

    }
    console.log(8)
    return { err, message }


}

export default createSpace;