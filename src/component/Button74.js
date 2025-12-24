import "../Button74.css";

const Button74 = ({ text = "Button 74", onClick }) => {
  return (
    <button className="button-74" onClick={onClick}>
      {text}
    </button>
  );
};

export default Button74;
