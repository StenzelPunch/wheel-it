import React, {useState}from 'react'
import Wheel from '../components/Wheel'

const s = [
    {label: "100", color: "#ff0000"},
    {label: "200", color: "#00ff00"},
    {label: "300", color: "#0000ff"},
    {label: "400", color: "#ff00ff"},
    {label: "500", color: "#ffff00"},
    {label: "600", color: "#00ffff"},
]

function WheelPage() {
    // eslint-disable-next-line
    const [segments, setSegment] = useState(s)

    return (
        <>
            <Wheel segments={segments}/>
        </>
    )
    
}

export default WheelPage