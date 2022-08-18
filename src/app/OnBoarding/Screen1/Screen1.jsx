import FormGroup from "../common/FormGroup/FormGroup";
import Input from "../common/Input/Input";
import Screen from "../common/Screen/Screen";

const FormGroupCont = ({ formCheckCallback }) => {
  return (
    <FormGroup>
      <Input label={"Full Name"} required onChange={formCheckCallback} />
      <Input label={"Display Name"} required onChange={formCheckCallback} />
    </FormGroup>
  );
};

export default function Screen1({ onBtnClick }) {
  return (
    <Screen
      heading={"Welcome! First things first..."}
      subHeading={"You can always change them later."}
      btnText={"Create Workspace"}
      onBtnClick={onBtnClick}
      Slot2={FormGroupCont}
    />
  );
}
