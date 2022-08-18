import classes from "./Button.module.css";

export default function Button({ text, onClick, className, type, disabled }) {
  return (
    <button className={`${classes.root} ${className}`} type={type} onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
}
