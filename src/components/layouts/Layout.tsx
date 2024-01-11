import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import styled from "styled-components";
import { AppDispatch, useSelector } from "../../store/configstore";
import { fetchClassSelection, fetchGradeList, fetchTeacherWithoutAccount, fetchUnAssignTeacherList } from "../../store/initdata/operation";
import Navigation from "./Navigator/NavigatorList";
import Header from "./header/header";
import { checkAuth } from "../../store/authentication/operation";

const ContentLayout = styled("div")(() => ({
  flexGrow: 1,
  display: "grid",
  height: `calc(100vh - 60px)`,
  gridTemplateColumns: "230px 1fr",
}));

const Layout = () => {

  const isAuthenticated = useSelector(state => state.authentication.isAuthenticated)
  const dispatch = useDispatch<AppDispatch>();

  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchUnAssignTeacherList());
      dispatch(fetchGradeList());
      dispatch(fetchClassSelection());
      dispatch(fetchTeacherWithoutAccount());
    } else {
      dispatch(checkAuth(token))
        .unwrap()
        .then(() => {
          dispatch(fetchUnAssignTeacherList());
          dispatch(fetchGradeList());
          dispatch(fetchClassSelection());
          dispatch(fetchTeacherWithoutAccount());
        })
        .catch(() => {
          console.log("fail!");
          <Navigate to="/login" />;
        });
    }


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
