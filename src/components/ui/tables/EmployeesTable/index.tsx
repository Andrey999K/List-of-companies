import { deleteEmployee, getEmployeeList, updateEmployee } from "../../../../store/employeeSlicer.ts";
import { Employee } from "../../../../types/types.ts";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks.ts";
import TextField from "../../../common/TextField";
import React, { useState } from "react";
import paginate from "../../../../utils/paginate.ts";
import Icon from "../../../common/Icon";

interface EmployeesTableInterface {
  selectedCompany: number | null;
}

const EmployeesTable = ({ selectedCompany }: EmployeesTableInterface) => {
  const employeeList = useAppSelector(getEmployeeList());
  const dispatch = useAppDispatch();
  const findEmployees = employeeList.filter(employee => employee.companyId === selectedCompany);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const countPages = Math.ceil(findEmployees.length / pageSize);
  const currentItems = paginate(findEmployees, currentPage, pageSize);
  const [selectedItem, setSelectedItem] = useState<Employee[]>([]);
  const handlerDeleteEmployee = (employeeId: number) => dispatch(deleteEmployee(employeeId));
  const handlerChange = (id: number, name: string, value: string) => {
    dispatch(updateEmployee({ id, [name]: value }));
  };
  const handleEditCountPage = (e: React.ChangeEvent<HTMLSelectElement>) => setPageSize(Number(e.target.value));
  const prevPage = () => (currentPage !== 1 ? setCurrentPage(prevState => prevState - 1) : "");
  const nextPage = () => (currentPage !== countPages ? setCurrentPage(prevState => prevState + 1) : "");
  const handlerSelectAllItems = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) setSelectedItem(findEmployees);
    else setSelectedItem([]);
  };
  const handlerSelectItem = (e: React.ChangeEvent<HTMLInputElement>, employee: Employee) => {
    if (e.target.checked) setSelectedItem(prevState => [...prevState, employee]);
    else setSelectedItem(prevState => prevState.filter(item => item.id !== employee.id));
  };
  return (
    <div className="w-full flex justify-center items-center flex-col">
      {!!selectedCompany ? (
        <div className="h-full w-full">
          <span>Найдено {findEmployees.length} пользователей.</span>
          <div className="flex items-center gap-2 w-full">
            <input type="checkbox" onChange={handlerSelectAllItems} />
            <div className="w-1/4 font-bold">Возраст</div>
            <div className="w-1/4 font-bold">Фамилия</div>
            <div className="w-1/4 font-bold">Имя</div>
            <div className="w-1/4 font-bold">Должность</div>
            <div className="w-1/4"></div>
          </div>
          {currentItems.map(employee => (
            <div key={employee.id} className="flex items-center gap-2 w-full">
              {Object.keys(employee).map(field => {
                if (field === "id")
                  return (
                    <div key={employee.id}>
                      <input
                        type="checkbox"
                        checked={selectedItem.some(c => c.id === employee.id)}
                        onChange={e => handlerSelectItem(e, employee)}
                      />
                    </div>
                  );
                else if (field !== "companyId")
                  return (
                    <div key={field} className="w-1/4">
                      <TextField
                        value={employee[field as keyof Employee].toString()}
                        name={field}
                        onChange={handlerChange}
                        id={employee.id}
                        className="w-full"
                      />
                    </div>
                  );
              })}
              <div className="w-1/4">
                <button onClick={() => handlerDeleteEmployee(employee.id)}>Удалить</button>
              </div>
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
        <h2>Пользователей не найдено!</h2>
      )}
    </div>
  );
};

export default EmployeesTable;
