import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import Tooltip from "@material-ui/core/Tooltip";
import useBookings from "../../../shared/hooks/useBookings";

function ValueLabelComponent(props) {
  const { children, open, value } = props;
  console.log(value);
  return (
    //Pone el valor encima
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.number.isRequired,
};

const PrettoSlider = withStyles({
  // *Altura y color de la barra
  root: {
    color: "#0GE",
    height: 8,
    width: 150,
  },
  // *selector
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {}, //???
  //**Posicion valor mouseOver
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  //*Rail ocupado
  track: {
    height: 8,
    borderRadius: 4,
  },
  //*Fondo rail
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

export function CustomizedSlider(props) {
  const { filter, setFilter } = useBookings();
  const handleChange = (e, value) => {
    setFilter({ ...filter, [`${props.name}`]: value });
  };

  return (
    <div className={`priceContainer`}>
      <h5>{props.title}</h5>
      <PrettoSlider
        type="range"
        defaultValue={filter[`${props.name}`]}
        valueLabelDisplay="auto"
        aria-label="pretto slider"
        min={props.min}
        max={props.max}
        step={props.step}
        onChangeCommitted={handleChange}
      />
    </div>
  );
}
