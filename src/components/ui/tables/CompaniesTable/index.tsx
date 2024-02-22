import React, { ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks.ts";
import { getCompanyList, updateCompany } from "../../../../store/companySlicer.ts";
import { getEmployeeList } from "../../../../store/employeeSlicer.ts";
import TextField from "../../../common/TextField";

interface TableInterface {
  setCompany: React.Dispatch<React.SetStateAction<number | null>>;
}

const CompaniesTable = ({ setCompany }: TableInterface) => {
  const employeeList = useAppSelector(getEmployeeList());
  const companyList = useAppSelector(getCompanyList()).map(company => ({
    ...company,
    countEmployees: employeeList.filter(employee => employee.companyId === company.id).length
  }));
  const dispatch = useAppDispatch();
  const handlerSelectCompany = (e: ChangeEvent<HTMLInputElement>, companyId: number) => {
    if ((e.target as HTMLInputElement).checked) setCompany(companyId);
    else setCompany(null);
  };
  const handlerChange = (id: number, name: string, value: string) => {
    dispatch(updateCompany({ id, [name]: value }));
  };
  return (
    <div className="flex flex-col gap-2 divide-y-[1px] divide-black/50 w-full">
      {companyList.map(company => (
        <div key={company.id} className="flex items-center gap-2">
          <div>
            <input type="checkbox" onChange={e => handlerSelectCompany(e, company.id)} />
          </div>
          <div>
            <TextField value={company.name} name="name" onChange={handlerChange} id={company.id} />
          </div>
          <div>{company.countEmployees}</div>
        </div>
      ))}
    </div>
  );
};

export default CompaniesTable;
