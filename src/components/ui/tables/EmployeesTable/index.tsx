import { deleteEmployee, getEmployeeList, updateEmployee } from "../../../../store/employeeSlicer.ts";
import { Employee } from "../../../../types/types.ts";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks.ts";
import TextField from "../../../common/TextField";

interface EmployeesTableInterface {
  selectedCompany: number | null;
}

const EmployeesTable = ({ selectedCompany }: EmployeesTableInterface) => {
  const employeeList = useAppSelector(getEmployeeList());
  const dispatch = useAppDispatch();
  const findEmployees = employeeList.filter(employee => employee.companyId === selectedCompany);
  const handlerDeleteEmployee = (employeeId: number) => dispatch(deleteEmployee(employeeId));
  const handlerChange = (id: number, name: string, value: string) => {
    dispatch(updateEmployee({ id, [name]: value }));
  };
  return (
    <div className="w-full flex justify-center items-center flex-col">
      {!!selectedCompany ? (
        <div>
          <span>Найдено {findEmployees.length} пользователей.</span>
          {findEmployees.map(employee => (
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
        </div>
      ) : (
        <h2>Пользователей не найдено!</h2>
      )}
    </div>
  );
};

export default EmployeesTable;
