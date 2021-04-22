import Filler from "../components/Filler";
import PropTypes from "prop-types";

const HealthBar = (props) => {
  return (
    <div className="health-bar">
      <Filler percentage={props.percentage} />
    </div>
  );
};

HealthBar.defaultProps = {
  percentage: 0,
};

HealthBar.propTypes = {
  percentage: PropTypes.number.isRequired,
};

export default HealthBar;
