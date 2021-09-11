const Tooltip = ({ text, children }) => {
  return (
    <div title={text} className="csstooltip cursor-pointer">
      {children}
    </div>
  );
};

export default Tooltip;
