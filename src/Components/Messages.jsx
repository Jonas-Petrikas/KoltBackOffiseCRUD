import { useEffect } from "react"

export default function Messages({ message }) {


    return (
        <>
            <div className="message-container" style={{ display: (message === '' ? 'none' : true) }}>
                <div className="message">{message}</div>
            </div >
        </>

    )
}