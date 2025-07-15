import React from 'react'
import useSettings from 'app/hooks/useSettings'
import {ReactComponent  as Matxlogo } from "../../image/Matxlogo.svg"

const MatxLogo = ({ className }) => {
    const { settings } = useSettings()
    const theme = settings.themes[settings.activeTheme]

    return (
        <Matxlogo/>
    )
}

export default MatxLogo
