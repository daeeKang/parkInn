import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";

// core components
import './Footer.css';
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
              <a href="https://park-inn.org" className={classes.block} id="footer-link" target="_blank">
                Home
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="https://park-inn.org/#about" className={classes.block} id="footer-link" target="_blank">
                About Us
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="https://park-inn.org/#products" className={classes.block} id="footer-link" target="_blank">
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