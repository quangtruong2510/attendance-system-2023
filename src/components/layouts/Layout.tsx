import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { AppDispatch } from "../../store/configstore";
import { fetchClassSelection, fetchGradeList, fetchUnAssignTeacherList } from "../../store/initdata/operation";
import Navigation from "./Navigator/NavigatorList";
import Header from "./header/header";

const ContentLayout = styled("div")(() => ({
  flexGrow: 1,
  display: "grid",
  height: `calc(100vh - 60px)`,
  gridTemplateColumns: "230px 1fr",
}));

const Layout = () => {

  // const isAuthenticated = useSelector(state => state.authentication.isAuthenticated)
  const dispatch = useDispatch<AppDispatch>();

  // if (!isAuthenticated) {
  //   return <Navigate to="/login" />;
  // }
  useEffect(() => {
    // get token from localStorage
    // const token = { token: localStorage.getItem("token") };
    dispatch(fetchUnAssignTeacherList());
    dispatch(fetchGradeList());
    dispatch(fetchClassSelection());

    // dispatch(checkAuth());
    // if (!!token) {
    //   dispatch(checkAuth({token}));
    // }
    // If token is ! null call to verify the token
    // if valid token => navigate to the page
    // else => navigate to login page
    // call api to verify the token
  }, []);
  return (
    <>
      <Header />
      <ContentLayout>
        <Navigation />
        <Outlet />
      </ContentLayout>
    </>
  );
};

export default Layout;
