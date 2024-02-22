import ModalWindow from "../../common/ModalWindow";
import Button from "../../common/Button";
import useModal from "../../../hooks/useModal.tsx";
import TextField from "../../common/TextField";
import React, { useState } from "react";
import { useAppDispatch } from "../../../store/hooks.ts";
import { addCompany } from "../../../store/companySlicer.ts";
import notification from "../../../utils/notification.ts";

const initialState = {
  name: "",
  address: ""
};

const AddCompanyModal = () => {
  const { isOpenModal, handlerToggleModal } = useModal();
  const [company, setCompany] = useState(initialState);
  const dispatch = useAppDispatch();
  const handlerChange = (name: string, value: string) => {
    setCompany(prevState => ({ ...prevState, [name]: value }));
  };
  const handlerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(company);
    if (company.name === "") {
      notification("error", "Введите название компании!");
      return;
    }
    if (company.address === "") {
      notification("error", "Введите адрес компании!");
      return;
    }
    dispatch(addCompany(company));
    handlerToggleModal();
    setCompany(initialState);
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
              value={company.name}
              name="name"
              onChange={handlerChange}
              placeholder="Название"
              label="Введите название"
            />
            <TextField
              className="shadow-inner shadow-black/10 rounded focus:border-none outline-none p-2"
              value={company.address}
              name="address"
              onChange={handlerChange}
              placeholder="Адрес"
              label="Введите адрес"
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

export default AddCompanyModal;
