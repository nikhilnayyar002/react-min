import FormGroup from "../common/FormGroup/FormGroup";
import Screen from "../common/Screen/Screen";
import OneIcon from "assets/icons/one.svg?react";
import GroupIcon from "assets/icons/group.svg?react";
import classes from "./Screen3.module.css";
import { useCallback, useState } from "react";

const Card = ({ icon, heading, text, active, onClick }) => (
  <div className={`${classes.card} ${active ? classes.cardActive : ""}`} onClick={onClick}>
    {icon}
    <p className={classes.heading}>{heading}</p>
    <p className={classes.text}>{text}</p>
  </div>
);

const FormGroupCont = ({ formCheckCallback }) => {
  const [activeCard, setActiveCard] = useState();

  const onCardClick = useCallback(
    (n) => {
      setActiveCard(n);
      formCheckCallback(true);
    },
    [formCheckCallback]
  );

  return (
    <FormGroup>
      <div className={classes.cardCont}>
        <Card
          icon={<OneIcon />}
          heading="For myself"
          text="Write better. Think more clearly. Stay organized."
          active={activeCard === 1}
          onClick={() => onCardClick(1)}
        />
        <Card
          icon={<GroupIcon />}
          heading="With my team"
          text="Wikis, docs, tasks & projects, all in one place."
          active={activeCard === 2}
          onClick={() => onCardClick(2)}
        />
      </div>
    </FormGroup>
  );
};

export default function Screen3({ onBtnClick }) {
  return (
    <Screen
      heading={"How are you planning to use Eden?"}
      subHeading={"We'll streamline your setup experience accordingly."}
      btnText={"Create Workspace"}
      onBtnClick={onBtnClick}
      Slot2={FormGroupCont}
    />
  );
}
