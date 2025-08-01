import AuthGuard from "app/auth/AuthGuard";
import NotFound from "app/views/sessions/NotFound";
import chartsRoute from "app/views/charts/ChartsRoute";
import materialRoutes from "app/views/material-kit/MaterialRoutes";
import dashboardRoutes from "app/views/dashboard/DashboardRoutes";
import investmentpipelineRoutes from 'app/views/investmentpipeline/InvestmentpipelineRoutes'
import usermanagementRoutes from 'app/views/usermanagement/UsermanagementRoutes'
import documentsRoutes from 'app/views/documents/DocumentsRoutes'
import companylistsRoutes from 'app/views/companylists/CompanylistsRoutes'
import sessionRoutes from "app/views/sessions/SessionRoutes";
import MatxLayout from '../components/MatxLayout/MatxLayout'
import ChatPage from 'app/views/ChatSystem/ChatPage';
import FinGenieChatPage from 'app/views/ChatSystem/components/FinGenieChatPage';
import { Navigate } from 'react-router-dom';

export const AllPages = () => {
 const all_routes = [
  {
  path: '/',
  element: (
    <AuthGuard>
      <MatxLayout />
    </AuthGuard>
  ),
  children: [
    { index: true, element: <Navigate to="dashboard/default" replace /> },
    ...dashboardRoutes,
    ...investmentpipelineRoutes,
    ...usermanagementRoutes,
    ...documentsRoutes,
    ...companylistsRoutes,
    ...chartsRoute,
    ...materialRoutes,
    { path: 'fingenie-chatbot', element: <FinGenieChatPage /> },
  ],
},

  ...sessionRoutes,
];

  return all_routes;
};
