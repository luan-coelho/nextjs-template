'use client'

import React from 'react'
import { PulseLoader } from 'react-spinners'

export default function SpinnerLoading() {
    return (
        <div className="flex w-full items-center justify-center p-4">
            <PulseLoader color="#3A72EC" className="text-primary" />
        </div>
    )
}
