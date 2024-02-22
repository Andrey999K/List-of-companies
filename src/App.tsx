import { getCompanyList } from "./store/companySlicer.ts";
import AppLoader from "./hoc/AppLoader.tsx";
import { useAppSelector } from "./store/hooks.ts";
import { getEmployeeList } from "./store/employeeSlicer.ts";
import { useState } from "react";
import { Employee } from "./types/types.ts";

function App() {
  const companyList = useAppSelector(getCompanyList());
  const employeeList = useAppSelector(getEmployeeList());
  const [currentCompanyEmployees, setCurrentCompanyEmployees] = useState<Employee[]>([]);

  const handlerClickCompany = (companyId: number) => {
    setCurrentCompanyEmployees(employeeList.filter(employee => employee.companyId === companyId));
  };

  const handlerDeleteEmployee = () => {};

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
              <div>{employeeList.filter(employee => employee.companyId === company.id).length}</div>
            </div>
          ))}
        </div>
        <div className="w-full flex justify-center items-center flex-col">
          {!!currentCompanyEmployees.length ? (
            <div>
              <span>Найдено {currentCompanyEmployees.length} пользователей.</span>
              {currentCompanyEmployees.map(employee => (
                <div key={employee.id} className="flex items-center gap-2">
                  <input type="checkbox" />
                  <div>{employee.name}</div>
                  <button onClick={() => handlerDeleteEmployee}>Удалить</button>
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
