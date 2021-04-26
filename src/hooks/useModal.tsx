import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";

const modalRoot = document.getElementById("modal") as HTMLElement;
export default function useModal(
  content: JSX.Element
): [
  JSX.Element | undefined,
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>
] {
  const [isVisible, setIsVisible] = useState(false);
  const [modal, setModal] = useState<JSX.Element>();
  const [element] = useState<HTMLDivElement>(document.createElement("div"));

  useEffect(() => {
    modalRoot.appendChild(element);

    return () => {
      modalRoot.removeChild(element);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isVisible) {
      setModal(() => createPortal(content, element));
    } else {
      setModal(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content, isVisible]);

  return [modal, isVisible, setIsVisible];
}
