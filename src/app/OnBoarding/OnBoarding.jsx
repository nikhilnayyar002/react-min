import classes from "./OnBoarding.module.css";
import logoImg from "assets/imgs/logo.jpg";
import Stepper from "../Stepper/Stepper";
import { useCallback, useState } from "react";
import Screen1 from "./Screen1/Screen1";
import Screen2 from "./Screen2/Screen2";
import Screen3 from "./Screen3/Screen3";
import Screen4 from "./Screen4/Screen4";

const screens = [Screen1, Screen2, Screen3, Screen4];

export default function OnBoarding() {
  const [currentStep, setCurrentStep] = useState(1);

  const CurrentScreen = screens[currentStep - 1];

  const gotoNextScreen = useCallback(() => {
    if (currentStep !== 4) setCurrentStep(currentStep + 1);
  }, [currentStep]);

  return (
    <div className={classes.root}>
      <img src={logoImg} alt="Eden" />
      <Stepper noOfSteps={4} currentStep={currentStep} />
      {CurrentScreen && <CurrentScreen onBtnClick={gotoNextScreen} />}
    </div>
  );
}
