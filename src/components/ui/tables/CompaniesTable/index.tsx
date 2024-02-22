import React, { ChangeEvent } from "react";
import { useAppSelector } from "../../../store/hooks.ts";
import { getCompanyList } from "../../../store/companySlicer.ts";
import { getEmployeeList } from "../../../store/employeeSlicer.ts";

interface TableInterface {
  setCompany: React.Dispatch<React.SetStateAction<number | null>>;
}

const Table = ({ setCompany }: TableInterface) => {
  const companyList = useAppSelector(getCompanyList());
  const employeeList = useAppSelector(getEmployeeList());
  const handlerClickCompany = (e: ChangeEvent<HTMLInputElement>, companyId: number) => {
    if ((e.target as HTMLInputElement).checked) setCompany(companyId);
    else setCompany(null);
  };
  return (
    <div className="flex flex-col gap-2 divide-y-[1px] divide-black/50 w-full">
      <div className="flex flex-col gap-2 divide-y-[1px] divide-black/50 w-full">
        {companyList.map(company => (
          <div key={company.id} className="flex items-center gap-2">
            <div>
              <input type="checkbox" onChange={e => handlerClickCompany(e, company.id)} />
            </div>
            <div>{company.name}</div>
            <div>{employeeList.filter(employee => employee.companyId === company.id).length}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Table;
