import classes from "./Input.module.css";

export default function Input({ label, required, onChange, beforeContent, afterContent }) {
  return (
    <div className={classes.root}>
      <label htmlFor="">
        {label}
        {!required && <span> (optional)</span>}
      </label>
      <div className={classes.inputCont}>
        {beforeContent}
        <input type="text" required={required} onChange={onChange} />
        {afterContent}
      </div>
    </div>
  );
}
