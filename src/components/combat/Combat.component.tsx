import Bar from "components/@shared/bar/Bar.component";
import Button from "components/@shared/button/Button.component";
import { Enemy } from "components/map/Map.utils";
import React from "react";
import { useState } from "react";
import { Player } from "types/Player";
import "./Combat.scss";

export interface CombatProps {}

const Combat: React.FC<CombatProps> = () => {
  const [visualizing, setVisualizing] = useState<Player>();
  const [attacking, setAttacking] = useState<Enemy>();

  return (
    <div className="Combat">
      <div className="Combat-description">
        <div className="Combat-descriptionFade"></div>
        <p>Os animais selvagens avançam em sua direção</p>
      </div>
      <div className="Combat-friendly">
        {visualizing && (
          <Button
            className="Combat-goBackBtn"
            onClick={() => setVisualizing(false as any)}
          >
            ⬅️ Visualizando
          </Button>
        )}
        <div className="Combat-player">
          <div className="Combat-playerHeader">
            <span>sorTuzin</span>
            {!visualizing && (
              <Button onClick={() => setVisualizing(true as any)}>ℹ️</Button>
            )}
          </div>
          <Bar label="HP" totalValue={50} currentValue={26} small={true} />
        </div>
        {visualizing && (
          <div className="Combat-actionContainer">
            <Button>Usar item</Button>
          </div>
        )}
      </div>
      <div className="Combat-hostile">
        {attacking && (
          <Button
            className="Combat-goBackBtn"
            onClick={() => setAttacking(false as any)}
          >
            ⬅️ Atacando
          </Button>
        )}
        <div className="Combat-enemy">
          <div className="Combat-enemyHeader">
            <span>Javali</span>
            {!attacking && (
              <Button onClick={() => setAttacking(true as any)}>⚔️</Button>
            )}
          </div>
          <Bar label="HP" totalValue={10} currentValue={10} small={true} />
        </div>
        {attacking && (
          <div className="Combat-actionContainer">
            <Button>⚔️ Golpear</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Combat;
