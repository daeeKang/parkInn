// readibility lols
const hexToRgb = input => {
    input = input + "";
    input = input.replace("#", "");
    let hexRegex = /[0-9A-Fa-f]/g;

    if(!hexRegex.test(input) || (input.length !== 3 && input.length !== 6))
      throw new Error("input is not a valid hex color.");

    if(input.length === 3) {
      let first = input[0];
      let second = input[1];
      let last = input[2];
      input = first + first + second + second + last + last;
    }

    input = input.toUpperCase(input);
    let first = input[0] + input[1];
    let second = input[2] + input[3];
    let last = input[4] + input[5];

    return (
      parseInt(first, 16) +
      ", " +
      parseInt(second, 16) +
      ", " +
      parseInt(last, 16)
    );
};

// const for blank canvas
const whiteColor = "#fff";
const blackColor = "000";
const lightGrey = "#90a4ae";

// box shadows for cards
const BoxShadow = {
    boxShadow:
      "0 4px 20px 0 rgba(" +
      hexToRgb(blackColor) +
      ",.14), 0 7px 10px -5px rgba(" +
      hexToRgb(lightGrey) +
      ",.4)"
};

// set background color for card headers
const darkBlueCardHeader = {
    background: "#1B262C",
    ...BoxShadow
};

const greenCardHeader = {
  background: "#81C784",
  ...BoxShadow
};

const redCardHeader = {
  background: "#E57373",
  ...BoxShadow
};

const yellowCardHeader = {
  background: "#FFB74D",
  ...BoxShadow
};

const lightBlueCardHeader = {
  background: "#90CAF9",
  ...BoxShadow
};

const tealCardHeader = {
  background: "#14BACE",
  ...BoxShadow
};

// styling
const cardHeaderStyle = {
    cardHeader: {
      padding: "0.75rem 1.25rem",
      marginBottom: "0",
      borderBottom: "none",
      background: "transparent",
      zIndex: "3 !important",
      "&$cardHeaderPlain,&$cardHeaderIcon,&$cardHeaderStats,&$darkBlueCardHeader,&$greenCardHeader,&$redCardHeader,&$yellowCardHeader,&$lightBlueCardHeader,&$tealCardHeader": {
        margin: "0 15px",
        padding: "0",
        position: "relative",
        color: "whiteColor",
      },

      "&:first-child": {
        borderRadius: "calc(.25rem - 1px) calc(.25rem - 1px) 0 0"
      },

      "&$darkBlueCardHeader,&$greenCardHeader,&$redCardHeader,&$yellowCardHeader,&$lightBlueCardHeader,&$tealCardHeader": {
        "&:not($cardHeaderIcon)": {
          borderRadius: "3px",
          marginTop: "-30px",
          padding: "10px",
          fontFamily: "'Helvetica', 'Muli'",
          fontWeight: "100", 
        }
      },

      "&$cardHeaderStats svg": {
        fontFamily: "'Helvetica', 'Muli'",
        fontWeight: "100", 
        fontSize: "36px",
        lineHeight: "56px",
        textAlign: "center",
        width: "36px",
        height: "36px",
        margin: "10px 10px 4px"
      },

      "&$cardHeaderStats i,&$cardHeaderStats .material-icons": {
        fontSize: "36px",
        lineHeight: "56px",
        width: "56px",
        height: "56px",
        textAlign: "center",
        overflow: "unset",
        marginBottom: "1px"
      },

      "&$cardHeaderStats$cardHeaderIcon": {
        textAlign: "right"
      }
    },

    cardHeaderPlain: {
      marginLeft: "0px !important",
      marginRight: "0px !important"
    },

    cardHeaderStats: {
      "& $cardHeaderIcon": {
        textAlign: "right"
      },
      "& h1,& h2,& h3,& h4,& h5,& h6": {
        margin: "0 !important",
      }
    },

    cardHeaderIcon: {
      "&$darkBlueCardHeader,&$greenCardHeader,&$redCardHeader,&$yellowCardHeader,&$lightBlueCardHeader,&$tealCardHeader": {
        background: "transparent",
        boxShadow: "none"
      },
      "& i,& .material-icons": {
        width: "33px",
        height: "33px",
        textAlign: "center",
        lineHeight: "33px"
      },
      "& svg": {
        width: "24px",
        height: "24px",
        textAlign: "center",
        lineHeight: "33px",
        margin: "5px 4px 0px"
      }
    },
    
    darkBlueCardHeader: {
      color: whiteColor,
      "&:not($cardHeaderIcon)": {
        ...darkBlueCardHeader
      }
    },

    greenCardHeader: {
      color: whiteColor,
      "&:not($cardHeaderIcon)": {
        ...greenCardHeader
      }
    },

    redCardHeader: {
      color: whiteColor,
      "&:not($cardHeaderIcon)": {
        ...redCardHeader
      }
    },

    yellowCardHeader: {
      color: whiteColor,
      "&:not($cardHeaderIcon)": {
        ...yellowCardHeader
      }
    },

    lightBlueCardHeader: {
      color: whiteColor,
      "&:not($cardHeaderIcon)": {
        ...lightBlueCardHeader
      }
    },

    tealCardHeader: {
      color: whiteColor,
      "&:not($cardHeaderIcon)": {
        ...tealCardHeader
      }
    },

  };
  
  export {
    cardHeaderStyle,
    darkBlueCardHeader,
    greenCardHeader,
    redCardHeader,
    yellowCardHeader,
    lightBlueCardHeader,
    tealCardHeader,
  };