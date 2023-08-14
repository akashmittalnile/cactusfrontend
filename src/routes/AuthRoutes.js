import AdminLogin from "../views/auth/AdminLogin";
import { AuthLayout } from "../layouts/Auth/AuthLayout";

var AuthRoutes = [
  {
    path: "/",
    exact: true,
    layout: AuthLayout,
    component: AdminLogin,
  },

];

export default AuthRoutes;