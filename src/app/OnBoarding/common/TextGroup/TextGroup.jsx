import classes from "./TextGroup.module.css";

export default function TextGroup({ heading, subHeading }) {
  return (
    <div className={classes.root}>
      <h1 className={classes.heading}>{heading}</h1>
      <p className={classes.para}>{subHeading}</p>
    </div>
  );
}
