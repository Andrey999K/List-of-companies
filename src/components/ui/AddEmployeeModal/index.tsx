import ModalWindow from "../../common/ModalWindow";
import Button from "../../common/Button";
import useModal from "../../../hooks/useModal.tsx";
import TextField from "../../common/TextField";
import React, { useState } from "react";
import notification from "../../../utils/notification.ts";
import { useAppDispatch, useAppSelector } from "../../../store/hooks.ts";
import { getCompanyList } from "../../../store/companySlicer.ts";
import { addEmployee } from "../../../store/employeeSlicer.ts";
import { PayloadNewEmployee } from "../../../types/types.ts";

interface AddEmployeeModalProps {
  selectedCompany: number;
}

const AddEmployeeModal = ({ selectedCompany }: AddEmployeeModalProps) => {
  const companies = useAppSelector(getCompanyList());
  const initialState = {
    name: "",
    surname: "",
    position: "",
    age: "",
    companyId: companies.find(company => company.id === selectedCompany)?.id.toString() || ""
  };
  const { isOpenModal, handlerToggleModal } = useModal();
  const [employee, setEmployee] = useState<PayloadNewEmployee>(initialState);
  const dispatch = useAppDispatch();

  const handlerChange = (name: string, value: string) => {
    setEmployee(prevState => ({ ...prevState, [name]: value }));
  };
  const errors = {
    name: "Введите имя!",
    surname: "Введите фамилию!",
    position: "Введите должность!",
    age: "Введите возраст!",
    companyId: "Выберите компанию!"
  };
  const handlerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    for (const field in employee) {
      if (employee[field as keyof typeof employee] === "") {
        notification("error", errors[field as keyof typeof errors]);
        return;
      }
    }
    console.log(employee);
    dispatch(addEmployee(employee));
    handlerToggleModal();
    setEmployee(initialState);
  };
  return (
    <div className="w-auto">
      <Button onClick={handlerToggleModal} className="w-10">
        +
      </Button>
      {isOpenModal && (
        <ModalWindow onClickOut={handlerToggleModal} closeButton={true}>
          <h2 className="text-2xl">Новый сотрудник</h2>
          <form onSubmit={handlerSubmit} className="flex flex-col gap-4 mt-4">
            <TextField
              className="shadow-inner shadow-black/10 rounded focus:border-none outline-none p-2"
              value={employee.name}
              name="name"
              onChange={handlerChange}
              placeholder="Имя"
              label="Введите имя"
            />
            <TextField
              className="shadow-inner shadow-black/10 rounded focus:border-none outline-none p-2"
              value={employee.surname}
              name="surname"
              onChange={handlerChange}
              placeholder="Фамилия"
              label="Введите фамилию"
            />
            <TextField
              className="shadow-inner shadow-black/10 rounded focus:border-none outline-none p-2"
              value={employee.position}
              name="position"
              onChange={handlerChange}
              placeholder="Должность"
              label="Введите должность"
            />
            <TextField
              className="shadow-inner shadow-black/10 rounded focus:border-none outline-none p-2"
              value={employee.age}
              name="age"
              onChange={handlerChange}
              placeholder="Возраст"
              label="Введите возраст"
              type="number"
            />
            <select
              name="company"
              className="shadow-inner shadow-black/10 rounded focus:border-none outline-none p-2"
              onChange={e => handlerChange("companyId", e.target.value)}
              value={employee.companyId}
            >
              <option value="" disabled selected>
                Выберите компанию
              </option>
              {companies.map(company => (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
              ))}
            </select>
            <div className="flex justify-end items-center gap-3">
              <Button className="px-3">Добавить</Button>
              <Button className="px-3 !bg-gray-400" onClick={handlerToggleModal}>
                Отмена
              </Button>
            </div>
          </form>
        </ModalWindow>
      )}
    </div>
  );
};

export default AddEmployeeModal;
