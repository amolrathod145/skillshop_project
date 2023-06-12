import React, { useState } from 'react'

export default function Test() {
    const [num, setnum] = useState(0)
    return (
        <div>
            <button
                onClick={e => {
                    setnum(pre => pre + 1)
                    setnum(pre => pre + 1)
                    // setnum(num + 1)
                }}
                className="btn btn-dark">+</button>
            <span>{num}</span>
            <button
                onClick={e => setnum(num - 1)}
                className="btn btn-dark">-</button>
        </div>
    )
}
