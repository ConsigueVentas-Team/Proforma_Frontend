import ResetPasswordPage from "@/pages/ResetPassword";
import { Login } from "@/pages/Login";
import AuthLayout from "@/layouts/AuthLayout";
import { Step2 } from "@/pages/Step2";

const createAuthRoute = (element: React.ReactNode) => (
  <AuthLayout>{element}</AuthLayout>
);

const authRouter = [
  {
    path: "/login",
    element: createAuthRoute(<Login />),
  },
  {
    path: "/login/reset-password",
    element: createAuthRoute(<ResetPasswordPage />),
  },
  {
    path: "/login/reset-password/step2",
    element: createAuthRoute(<Step2 />),
  },
];

export default authRouter;
