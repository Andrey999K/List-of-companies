import ModalWindow from "../../common/ModalWindow";
import Button from "../../common/Button";
import useModal from "../../../hooks/useModal.tsx";
import TextField from "../../common/TextField";
import React, { useState } from "react";
import notification from "../../../utils/notification.ts";

const initialState = {
  name: "",
  surname: "",
  position: "",
  age: ""
};

const AddEmployeeModal = () => {
  const { isOpenModal, handlerToggleModal } = useModal();
  const [employee, setEmployee] = useState(initialState);
  // const dispatch = useAppDispatch();
  const handlerChange = (name: string, value: string) => {
    setEmployee(prevState => ({ ...prevState, [name]: value }));
  };
  const errors = {
    name: "Введите имя!",
    surname: "Введите фамилию!",
    position: "Введите должность!",
    age: "Введите возраст!"
  };
  const handlerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    for (const field in employee) {
      if (employee[field as keyof typeof employee] === "") {
        notification("error", errors[field as keyof typeof errors]);
        return;
      }
    }
    // dispatch(addEmployee(employee));
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
          <h2 className="text-2xl">Новая компания</h2>
          <form onSubmit={handlerSubmit} className="flex flex-col gap-4 mt-4">
            <TextField
              className="shadow-inner shadow-black/10 rounded focus:border-none outline-none p-2"
              value={employee.name}
              name="name"
              onChange={handlerChange}
              placeholder="Название"
              label="Введите название"
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
