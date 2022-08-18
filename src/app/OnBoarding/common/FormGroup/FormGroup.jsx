import classes from "./FormGroup.module.css";

export default function FormGroup({ children }) {
  return <div className={classes.root}>{children}</div>;
}
