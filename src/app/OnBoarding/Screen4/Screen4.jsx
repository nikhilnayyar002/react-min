import Screen from "../common/Screen/Screen";
import checkIcon from "assets/icons/check.svg";
import classes from "./Screen4.module.css";

export default function Screen4({ onBtnClick }) {
  return (
    <Screen
      heading={"Congratulations, Eren!"}
      subHeading={"You have completed onboarding, you can start using the Eden!"}
      btnText={"Launch Eden"}
      onBtnClick={onBtnClick}
      slot1={
        <div className={classes.doneIcon}>
          <img src={checkIcon} alt="" />
        </div>
      }
    />
  );
}
