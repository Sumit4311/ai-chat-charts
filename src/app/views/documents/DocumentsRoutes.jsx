import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable';

const Documents = Loadable(lazy(() => import("./Documents")));


const documentsRoutes = [
    {
        path: '/documents',
        element: <Documents />,
    },
]

export default documentsRoutes
