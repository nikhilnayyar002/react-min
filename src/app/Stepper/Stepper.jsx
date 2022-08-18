import { useMemo } from "react";
import classes from "./Stepper.module.css";

const getArrayOfNaturalNo = (n) => Array.from({ length: n }, (_, i) => i + 1);

export default function Stepper({ noOfSteps, currentStep }) {
  const steps = useMemo(() => getArrayOfNaturalNo(noOfSteps), [noOfSteps]);

  return (
    <div className={classes.root}>
      {steps.map((i) => (
        <div key={i} className={`${classes.circleCont} ${i <= currentStep ? classes.circleContActive : ""}`}>
          <hr />
          <div>{i}</div>
          <hr />
        </div>
      ))}
    </div>
  );
}
