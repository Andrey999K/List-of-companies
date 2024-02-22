import { deleteEmployee, getEmployeeList, updateEmployee } from "../../../../store/employeeSlicer.ts";
import { Employee } from "../../../../types/types.ts";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks.ts";
import TextField from "../../../common/TextField";
import { useState } from "react";
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
  const handlerDeleteEmployee = (employeeId: number) => dispatch(deleteEmployee(employeeId));
  const handlerChange = (id: number, name: string, value: string) => {
    dispatch(updateEmployee({ id, [name]: value }));
  };
  const prevPage = () => (currentPage !== 1 ? setCurrentPage(prevState => prevState - 1) : "");
  const nextPage = () => (currentPage !== countPages ? setCurrentPage(prevState => prevState + 1) : "");
  return (
    <div className="w-full flex justify-center items-center flex-col">
      {!!selectedCompany ? (
        <div>
          <span>Найдено {findEmployees.length} пользователей.</span>
          {currentItems.map(employee => (
            <div key={employee.id} className="flex items-center gap-2">
              {Object.keys(employee).map(field => (
                <div key={field}>
                  <TextField
                    value={employee[field as keyof Employee].toString()}
                    name={field}
                    onChange={handlerChange}
                    id={employee.id}
                  />
                </div>
              ))}
              <button onClick={() => handlerDeleteEmployee(employee.id)}>Удалить</button>
            </div>
          ))}
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
        </div>
      ) : (
        <h2>Пользователей не найдено!</h2>
      )}
    </div>
  );
};

export default EmployeesTable;
