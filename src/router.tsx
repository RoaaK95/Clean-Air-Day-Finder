import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import {HomePage} from './features/home/HomePage'
import { ResultPage } from '@tanstack/react-query'

export const router = createBrowserRouter([
    {path: "/", element: <HomePage />},
    {path: "/results", element:<ResultPage />}
]);