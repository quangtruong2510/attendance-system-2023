import { Navigate, Route, Routes } from "react-router-dom";
import routeList from "../../../constant/routes";
import SignIn from "../../../pages/login/Login";
import Layout from "../Layout";
const RouterPage = () => {
  return (
    <>
      <Routes>
        <Route index element={<Navigate to={"/login"} replace />} />
        <Route path="/login" element={<SignIn></SignIn>} />
        <Route element={<Layout />}>
          {routeList.map((route, index) => {
            return (
              <Route key={index} path={route.path} element={route.component} />
            );
          })}
        </Route>
        <Route path="*" element={<SignIn></SignIn>} />
      </Routes>
    </>
  );
};

export { RouterPage };
