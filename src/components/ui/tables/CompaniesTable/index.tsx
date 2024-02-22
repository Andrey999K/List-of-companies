import React from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks.ts";
import { deleteCompany, getCompanyList, updateCompany } from "../../../../store/companySlicer.ts";
import { deleteEmployee, getEmployeeList } from "../../../../store/employeeSlicer.ts";
import TextField from "../../../common/TextField";
import { Company } from "../../../../types/types.ts";
import includesItem from "../../../../utils/includesItem.ts";
import usePaginate from "../../../../hooks/usePaginate.tsx";
import Icon from "../../../common/Icon";
import AddCompanyModal from "../../AddCompanyModal";
import Button from "../../../common/Button";

interface TableInterface {
  selectedCompany: Company[];
  setSelectedCompany: React.Dispatch<React.SetStateAction<Company[]>>;
}

const CompaniesTable = ({ selectedCompany, setSelectedCompany }: TableInterface) => {
  const employeeList = useAppSelector(getEmployeeList());
  const companyList = useAppSelector(getCompanyList()).map(company => ({
    ...company,
    countEmployees: employeeList.filter(employee => employee.companyId === company.id).length
  }));
  const { currentItems, prevPage, nextPage, handleEditCountPage, currentPage, setCurrentPage, pageSize, countPages } =
    usePaginate(1, 10, companyList);
  const dispatch = useAppDispatch();
  const handlerSelectCompany = (e: React.ChangeEvent<HTMLInputElement>, company: Company) => {
    if (e.target.checked) setSelectedCompany(prevState => [...prevState, company]);
    else setSelectedCompany(prevState => prevState.filter(item => item.id !== company.id));
  };
  const handlerChange = (name: string, value: string, id?: number) => {
    if (id) dispatch(updateCompany({ id, [name]: value }));
  };
  const handlerSelectAllItems = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) setSelectedCompany(companyList);
    else setSelectedCompany([]);
  };
  const handlerDeleteSelected = () => {
    setSelectedCompany([]);
    dispatch(deleteCompany(selectedCompany));
    dispatch(deleteEmployee({ companyId: selectedCompany.map(company => company.id) }));
  };
  return (
    <div className="flex flex-col w-full max-w-[40%]">
      {currentItems.length ? (
        <div className="divide-y-[1px] divide-black/50 flex flex-col">
          <div className="flex items-center gap-2 w-full my-4 px-3">
            <input type="checkbox" onChange={handlerSelectAllItems} />
            <div className="w-1/4 font-bold">Название</div>
            <div className="w-1/4 font-bold">Сотрудники</div>
            <div className="w-1/4 font-bold">Адрес</div>
          </div>
          {currentItems.map(company => (
            <div
              key={company.id}
              className={`duration-100 px-3 flex items-center py-2 gap-2${
                includesItem(selectedCompany, company) ? " bg-green-400" : ""
              }`}
            >
              <div>
                <input
                  type="checkbox"
                  checked={includesItem(selectedCompany, company)}
                  onChange={e => handlerSelectCompany(e, company)}
                />
              </div>
              <div className="w-1/4">
                <TextField value={company.name} name="name" onChange={handlerChange} id={company.id} />
              </div>
              <div className="w-1/4">{company.countEmployees}</div>
              <div className="w-1/4">{company.address}</div>
            </div>
          ))}
          <div className="flex items-center justify-between mt-5">
            <div className="flex items-center">
              <button onClick={() => setCurrentPage(1)}>
                <Icon name="first" />
              </button>
              <button onClick={prevPage}>
                <Icon name="prev" />
              </button>
              <span>
                {currentPage} из {countPages}
              </span>
              <button onClick={nextPage}>
                <Icon name="next" />
              </button>
              <button onClick={() => setCurrentPage(countPages)}>
                <Icon name="last" />
              </button>
            </div>
            <select
              name="countOnPage"
              className="p-1 rounded-[5px] focus:outline-none focus:border-none dark:bg-blackDark"
              value={pageSize}
              onChange={handleEditCountPage}
            >
              <option value="3">На странице 3</option>
              <option value="5">На странице 5</option>
              <option value="10">На странице 10</option>
              <option value="25">На странице 25</option>
              <option value="50">На странице 50</option>
              <option value="100">На странице 100</option>
            </select>
          </div>
        </div>
      ) : (
        <h2>Нет ни одной компании!</h2>
      )}
      <div className="mt-2 flex items-center justify-start gap-3">
        <AddCompanyModal />
        <Button className="w-10 bg-red-500" onClick={handlerDeleteSelected}>
          -
        </Button>
      </div>
    </div>
  );
};

export default CompaniesTable;
