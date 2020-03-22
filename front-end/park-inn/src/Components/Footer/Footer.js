import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";

// core components
import styles from "./footerStyle";

const useStyles = makeStyles(styles);

export default function Footer(props) {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <a href="#home" className={classes.block}>
                Home
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="#about" className={classes.block}>
                About Us
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="#contact" className={classes.block}>
                Contact
              </a>
            </ListItem>
          </List>
        </div>

        {/* <p className={classes.right}>
          <span>
            &copy; {1900 + new Date().getYear()}{" "}
            ParkInn
          </span>
        </p> */}
        
      </div>
    </footer>
  );
}