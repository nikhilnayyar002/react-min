import FormGroup from "../common/FormGroup/FormGroup";
import Input from "../common/Input/Input";
import Screen from "../common/Screen/Screen";
import classes from "./Screen2.module.css";

const FormGroupCont = ({ formCheckCallback }) => {
  return (
    <FormGroup>
      <Input label={"Workspace Name"} required onChange={formCheckCallback} />
      <Input
        label={"Workspace URL"}
        onChange={formCheckCallback}
        beforeContent={<div className={classes.workspaceUrlInpBeforeContent}>www.eden.com/</div>}
      />
    </FormGroup>
  );
};

export default function Screen2({ onBtnClick }) {
  return (
    <Screen
      heading={"Let's set up a home for all your work"}
      subHeading={"You can always create another workspace later."}
      btnText={"Create Workspace"}
      onBtnClick={onBtnClick}
      Slot2={FormGroupCont}
    />
  );
}
