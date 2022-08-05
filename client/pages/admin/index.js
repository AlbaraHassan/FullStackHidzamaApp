import { useEffect } from "react"





export default function AdminPanel() {
    useEffect(() => {
        window.location.replace("http://localhost:8000/admin/login/?next=/admin/login")
    }, [])
    return <></>
}