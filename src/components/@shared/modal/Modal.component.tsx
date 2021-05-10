import React, { PropsWithChildren, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Button from "../button/Button.component";
import "./Modal.scss";

const modalRoot = document.getElementById("modal") as HTMLElement;
export interface ModalProps {
  closeLabel?: string;
  onClose?: () => void;
}

const Modal: React.FC<PropsWithChildren<ModalProps>> = ({
  children,
  closeLabel,
  onClose,
}) => {
  const [element] = useState<HTMLDivElement>(document.createElement("div"));

  useEffect(() => {
    element.classList.add("Modal");
    modalRoot.appendChild(element);

    return () => {
      modalRoot.removeChild(element);
    };
  }, [element]);

  return createPortal(
    <div className="Modal-container">
      {closeLabel && (
        <div className="Modal-close">
          <Button onClick={onClose}>{closeLabel}</Button>
        </div>
      )}
      {children}
    </div>,
    element
  );
};

export default Modal;
