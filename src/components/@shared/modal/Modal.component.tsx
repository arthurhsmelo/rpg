import React, { PropsWithChildren, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import "./Modal.scss";

const modalRoot = document.getElementById("modal") as HTMLElement;
export interface ModalProps {}

const Modal: React.FC<PropsWithChildren<ModalProps>> = ({ children }) => {
  const [element] = useState<HTMLDivElement>(document.createElement("div"));

  useEffect(() => {
    element.classList.add("Modal");
    modalRoot.appendChild(element);

    return () => {
      modalRoot.removeChild(element);
    };
  }, [element]);

  return createPortal(
    <div className="Modal-container">{children}</div>,
    element
  );
};

export default Modal;
