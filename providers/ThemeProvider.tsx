'use client'

import { NextUIProvider } from '@nextui-org/react'
import React, { PropsWithChildren } from 'react'

const ThemeProvider = ({ children }: PropsWithChildren) => {
    return (
        <NextUIProvider>{children}</NextUIProvider>
    )
}

export default ThemeProvider