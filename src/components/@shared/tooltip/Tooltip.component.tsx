import cn from "classnames";
import React, { PropsWithChildren } from "react";
import "./Tooltip.scss";

interface TooltipProps {
  content?: JSX.Element;
  position?: "top" | "bottom";
}

const Tooltip: React.FC<PropsWithChildren<TooltipProps>> = ({
  children,
  content,
  position = "top",
}) => {
  return (
    <div className={cn({ Tooltip: true, [`Tooltip-${position}`]: true })}>
      {children}
      {content && <span className="Tooltip-text">{content}</span>}
    </div>
  );
};

export default Tooltip;
