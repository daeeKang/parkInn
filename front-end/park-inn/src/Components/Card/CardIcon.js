import React from "react";
import classNames from "classnames";                      // concatenate classnames
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";    // material ui components

import styles from "./cardIconStyle";                     // core components - get card colors

const useStyles = makeStyles(styles);

export default function CardIcon(props) {
  const classes = useStyles();
  const { className, children, color, ...rest } = props;
  
  const cardIconClasses = classNames({
    [classes.cardIcon]: true,
    [classes[color + "CardHeader"]]: color,
    [className]: className !== undefined
  });

  return (
    <div className={cardIconClasses} {...rest}>
      {children}
    </div>
  );
}

CardIcon.propTypes = {
  className: PropTypes.string,
  color: PropTypes.oneOf([
    "lightBlue",
    "blue",
    "darkBlue",
    "lightGreen",
    "green",
    "mediumGreen",
    "darkGreen",
    "red",
    "lightYellow",
    "yellow",
    "lightTeal",
    "teal",
    "darkTeal",
  ]),
  children: PropTypes.node
};