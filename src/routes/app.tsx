import AppLayout from "@/layouts/AppLayout";
import { Navigate } from "react-router-dom";
import { Profile } from "@/pages/Profile";
import { Proforma } from "@/pages/Proforma";
import ProtectedRoute from "@/components/ProtectedRoute";
import ProformaCreate from "@/components/proforma/ProformaCreate";

const appRouter = [
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <Proforma />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "proforma",
        element: <Proforma />,
      },
      {
        path: "proforma/create",
        element: <ProformaCreate />,
      },

      {
        path: "*",
        element: <Navigate to="/" />,
      },
    ],
  },
];

export default appRouter;
