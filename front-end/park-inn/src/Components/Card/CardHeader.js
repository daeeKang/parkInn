import React from "react";
import classNames from "classnames";                      // concatenate classes
import PropTypes from "prop-types";                       // set properties for components
import { makeStyles } from "@material-ui/core/styles";

import { cardHeaderStyle } from "./cardHeaderStyle";      // core components - get header colors

const useStyles = makeStyles(cardHeaderStyle);

export default function CardHeader(props) {
  const classes = useStyles();
  const { className, children, color, plain, stats, icon, ...rest } = props;

  const cardHeaderClasses = classNames({
    [classes.cardHeader]: true,
    [classes[color + "CardHeader"]]: color,
    [classes.cardHeaderPlain]: plain,
    [classes.cardHeaderStats]: stats,
    [classes.cardHeaderIcon]: icon,
    [className]: className !== undefined
  });
  
  return (
    <div className={cardHeaderClasses} {...rest}>
      {children}
    </div>
  );
}

CardHeader.propTypes = {
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
  plain: PropTypes.bool,
  stats: PropTypes.bool,
  icon: PropTypes.bool,
  children: PropTypes.node
};