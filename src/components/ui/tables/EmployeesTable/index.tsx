import { deleteEmployee, getEmployeeList, updateEmployee } from "../../../../store/employeeSlicer.ts";
import { Employee, UpdatedFieldsItem } from "../../../../types/types.ts";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks.ts";

interface EmployeesTableInterface {
  selectedCompany: number | null;
}

const EmployeesTable = ({ selectedCompany }: EmployeesTableInterface) => {
  const employeeList = useAppSelector(getEmployeeList());
  const dispatch = useAppDispatch();
  const findEmployees = employeeList.filter(employee => employee.companyId === selectedCompany);
  const handlerDeleteEmployee = (employeeId: number) => dispatch(deleteEmployee(employeeId));
  const handlerEditEmployee = (employeeId: number, data: UpdatedFieldsItem<Employee>) => {
    dispatch(updateEmployee({ id: employeeId, ...data }));
  };
  return (
    <div className="w-full flex justify-center items-center flex-col">
      {!!selectedCompany ? (
        <div>
          <span>Найдено {findEmployees.length} пользователей.</span>
          {findEmployees.map(employee => (
            <div key={employee.id} className="flex items-center gap-2">
              <input type="checkbox" />
              <div>{employee.name}</div>
              <button onClick={() => handlerEditEmployee(employee.id, { name: "Sibl" })}>Изменить</button>
              <button onClick={() => handlerDeleteEmployee(employee.id)}>Удалить</button>
            </div>
          ))}
        </div>
      ) : (
        <h2>Пользователей не найдено!</h2>
      )}
    </div>
  );
};

export default EmployeesTable;
