import { createBrowserRouter } from 'react-router-dom'
import {HomePage} from './features/home/HomePage'
import { ResultsPage } from './features/results/ResultsPage'

export const router = createBrowserRouter([
    {path: "/", element: <HomePage />},
    {path: "/results", element:<ResultsPage />}
]);