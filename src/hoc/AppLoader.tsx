import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks.ts";
import { getCompanyLoading, requestCompanyList } from "../store/companySlicer.ts";
import ScreenLoader from "../components/ui/ScreenLoader";
import { requestEmployeeList } from "../store/employeeSlicer.ts";

const AppLoader = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(getCompanyLoading());

  useEffect(() => {
    dispatch(requestCompanyList());
    dispatch(requestEmployeeList(null));
  }, []);

  if (isLoading) {
    return <ScreenLoader />;
  }

  return <div>{children}</div>;
};

export default AppLoader;
