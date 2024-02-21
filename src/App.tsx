import { getCompanyList } from "./store/companySlicer.ts";
import AppLoader from "./hoc/AppLoader.tsx";
import { useAppDispatch, useAppSelector } from "./store/hooks.ts";
import { useState } from "react";
import { getEmployeeList, requestEmployeeList } from "./store/employeeSlicer.ts";
import { Employee } from "./types/types.ts";

function App() {
  const companyList = useAppSelector(getCompanyList());
  const employeeList = useAppSelector(getEmployeeList());
  const dispatch = useAppDispatch();

  const handlerClickCompany = (companyId: number) => {
    dispatch(requestEmployeeList({ companyId }));
  };

  return (
    <AppLoader>
      <div className="w-full max-w-screen-xl mx-auto mt-5 flex gap-10">
        <div className="flex flex-col gap-2 divide-y-[1px] divide-black/50 w-full">
          {companyList.map(company => (
            <div key={company.id} className="flex items-center gap-2">
              <div>
                <input type="checkbox" onChange={() => handlerClickCompany(company.id)} />
              </div>
              <div>{company.name}</div>
            </div>
          ))}
        </div>
        <div className="w-full flex justify-center items-center flex-col">
          {!!employeeList.length ? (
            <div>
              <span>Найдено {employeeList.length} пользователей.</span>
              {employeeList.map(employee => (
                <div key={employee.id} className="flex items-center gap-2">
                  <input type="checkbox" />
                  <div>{employee.name}</div>
                </div>
              ))}
            </div>
          ) : (
            <h2>Пользователей не найдено!</h2>
          )}
        </div>
      </div>
    </AppLoader>
  );
}

export default App;
