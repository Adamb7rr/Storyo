import React, { useState, useEffect, useRef } from 'react'
import FOG from 'vanta/dist/vanta.fog.min'
import * as THREE from 'three'

const VantaFog = ({ theme }) => {
    const [vantaEffect, setVantaEffect] = useState(null)
    const myRef = useRef(null)

    useEffect(() => {
        if (vantaEffect) vantaEffect.destroy()

        const isDark = theme === 'dark'

        setVantaEffect(FOG({
            el: myRef.current,
            THREE: THREE,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            highlightColor: isDark ? 0x000000 : 0xffffff,
            midtoneColor: isDark ? 0x000000 : 0xffffff,
            lowlightColor: isDark ? 0x6633ee : 0xe6e6ff,
            baseColor: isDark ? 0x6633ee : 0xe6e6ff,
            blurFactor: 0.80,
            speed: 3.10,
            zoom: 2.10
        }))

        return () => {
            if (vantaEffect) vantaEffect.destroy()
        }
    }, [theme])

    return (
        <div
            ref={myRef}
            className="fixed inset-0 z-0 h-screen w-screen"
            style={{ pointerEvents: 'auto' }}
        />
    )
}

export default VantaFog
