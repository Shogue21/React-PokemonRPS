const Filler = (props) => {
  return (
    <div
      className="filler"
      style={
        props.percentage === 0
          ? { width: `0%` }
          : { width: `${props.percentage}%` }
      }
    >
      {props.percentage}/100
    </div>
  );
};

export default Filler;
