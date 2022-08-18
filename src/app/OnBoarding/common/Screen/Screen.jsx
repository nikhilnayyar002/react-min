import { useCallback, useRef, useState } from "react";
import Button from "../Button/Button";
import TextGroup from "../TextGroup/TextGroup";
import classes from "./Screen.module.css";

export default function Screen({ heading, subHeading, btnText, onBtnClick, slot1, Slot2 }) {
  const formRef = useRef(/** @type {HTMLFormElement} */ (null));
  const [formValid, setFormValid] = useState(false);

  const formCheckCallback = useCallback((val) => {
    setFormValid(typeof val === "boolean" ? val : formRef.current.checkValidity());
  }, []);

  return (
    <div className={classes.root}>
      {slot1}
      <TextGroup heading={heading} subHeading={subHeading} />
      <form ref={formRef} className={classes.form}>
        {Slot2 && <Slot2 formCheckCallback={formCheckCallback} />}
        <Button type="button" text={btnText} onClick={onBtnClick} disabled={Slot2 && !formValid} />
      </form>
    </div>
  );
}
