import cn from "classnames";
import Bar from "components/@shared/bar/Bar.component";
import ItemContainer from "components/@shared/item-container/ItemContainer.component";
import Tooltip from "components/@shared/tooltip/Tooltip.component";
import SkillsList from "components/skills-list/SkillsList.component";
import React from "react";
import "./HUDLeft.scss";

const HUDLeft: React.FC = () => {
  const name = "sorTuzin";
  const equipmentPieces = [
    {
      id: "head",
      label: "Cabeça",
    },
    {
      id: "shoulders",
      label: "Ombros",
      small: true,
    },
    {
      id: "chest",
      label: "Peito",
    },
    {
      id: "handsLeft",
      label: "Mãos",
      small: true,
    },
    {
      id: "handsRight",
      label: "Mãos",
      small: true,
    },
    {
      id: "waist",
      label: "Cintura",
      horizontal: true,
    },
    {
      id: "legs",
      label: "Pernas",
    },
    {
      id: "heldMain",
      label: "Primário",
      large: true,
    },
    {
      id: "heldSecondary",
      label: "Secundário",
      large: true,
    },
    {
      id: "feet",
      label: "Pés",
    },
  ];
  const currentEquipment: any = {
    head: "N/A",
    shoulders: "N/A",
    chest: "N/A",
    handsLeft: "N/A",
    handsRight: "N/A",
    legs: "N/A",
    waist: "N/A",
    feet: "N/A",
    heldMain: "N/A",
    heldSecondary: "N/A",
  };

  return (
    <div className="HUDLeft">
      <div className="HUDLeft-name">
        <span>{name}</span>
      </div>
      <div className="HUDLeft-equipmentContainer">
        {equipmentPieces.map((piece, index) => (
          <div key={piece.id} className={cn({ ["HUDLeft-" + piece.id]: true })}>
            <div
              className={cn({
                "HUDLeft-equipment": true,
                horizontal: piece.horizontal,
                small: piece.small,
                large: piece.large,
              })}
            >
              <span className="HUDLeft-equipmentLabel">{piece.label}</span>
              <Tooltip
                content={
                  <div style={{ width: 250, height: 250, fontSize: 14 }}>
                    Nada Equipado
                  </div>
                }
                position={index < 6 ? "bottom" : "top"}
              >
                <span>{currentEquipment[piece.id]}</span>
              </Tooltip>
            </div>
          </div>
        ))}
      </div>
      <Bar label="HP" currentValue={50} totalValue={50} />
      <ItemContainer
        label="Inventário"
        numberOfSlots={10}
        items={[
          {
            name: "Bandagem",
            label: "Ban",
            quantity: 2,
            modifier: "+2",
            description: "Cura 10 HP",
          },
        ]}
      />
      <SkillsList
        skills={[
          {
            name: "Facas",
            value: 3,
          },
          {
            name: "Cura",
            value: 3,
          },
        ]}
      />
    </div>
  );
};

export default HUDLeft;
