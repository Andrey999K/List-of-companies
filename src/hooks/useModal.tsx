import { useState } from "react";

function useModal() {
  const [isOpenModal, setOpenModal] = useState(false);

  const handlerToggleModal = () => {
    setOpenModal(!isOpenModal);
  };

  return { isOpenModal, setOpenModal, handlerToggleModal };
}
export default useModal;
