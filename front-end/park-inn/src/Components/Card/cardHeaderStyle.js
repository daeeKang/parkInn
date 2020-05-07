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
const lightBlueCardHeader = {
  background: "#83bedb",
  ...BoxShadow
};

const blueCardHeader = {
  background: "#4ea3cc",
  ...BoxShadow
};

const darkBlueCardHeader = {
    background: "#273941",
    ...BoxShadow
};

const lightGreenCardHeader = {
  background: "#80cbc4",
  ...BoxShadow
};

const greenCardHeader = {
  background: "#81C784",
  ...BoxShadow
};

const mediumGreenCardHeader = {
  background: "#009688",
  ...BoxShadow
};

const darkGreenCardHeader = {
  background: "#004d40",
  ...BoxShadow
};

const redCardHeader = {
  background: "#E57373",
  ...BoxShadow
};

const lightYellowCardHeader = {
  background: "#fdefb2",
  ...BoxShadow
};

const yellowCardHeader = {
  background: "#FFB74D",
  ...BoxShadow
};

const lightTealCardHeader = {
  background: "#89dce6",
  ...BoxShadow
};

const tealCardHeader = {
  background: "#75abc5",
  ...BoxShadow
};

const darkTealCardHeader = {
  background: "#006064",
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
      "&$cardHeaderPlain,&$cardHeaderIcon,&$cardHeaderStats,&$lightBlueCardHeader,&$darkBlueCardHeader,&$lightGreenCardHeader,&$greenCardHeader,&$mediumGreenCardHeader,&$darkGreenCardHeader,&$redCardHeader,&$lightYellowCardHeader,&$yellowCardHeader,&$lightTealCardHeader,&$tealCardHeader,&$darkTealCardHeader": {
        margin: "0 15px",
        padding: "0",
        position: "relative",
        color: "whiteColor",
      },

      "&:first-child": {
        borderRadius: "calc(.25rem - 1px) calc(.25rem - 1px) 0 0"
      },

      "&$lightBlueCardHeader,&$blueCardHeader,&$darkBlueCardHeader,&$lightGreenCardHeader,&$greenCardHeader,&$mediumGreenCardHeader,&$darkGreenCardHeader,&$redCardHeader,&$lightYellowCardHeader,&$yellowCardHeader,&$lightTealCardHeader,&$tealCardHeader,&$darkTealCardHeader": {
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
      "&$lightBlueCardHeader,&$blueCardHeader,&$darkBlueCardHeader,&$lightGreenCardHeader,&$greenCardHeader,&$mediumGreenCardHeader,&$darkGreenCardHeader,&$redCardHeader,&$lightYellowCardHeader,&$yellowCardHeader,&$lightTealCardHeader,&$tealCardHeader,&$darkTealCardHeader": {
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

    lightBlueCardHeader: {
      color: whiteColor,
      "&:not($cardHeaderIcon)": {
        ...lightBlueCardHeader
      }
    },

    blueCardHeader: {
      color: whiteColor,
      "&:not($cardHeaderIcon)": {
        ...blueCardHeader
      }
    },

    darkBlueCardHeader: {
      color: whiteColor,
      "&:not($cardHeaderIcon)": {
        ...darkBlueCardHeader
      }
    },

    lightGreenCardHeader: {
      color: whiteColor,
      "&:not($cardHeaderIcon)": {
        ...lightGreenCardHeader
      }
    },

    greenCardHeader: {
      color: whiteColor,
      "&:not($cardHeaderIcon)": {
        ...greenCardHeader
      }
    },

    mediumGreenCardHeader: {
      color: whiteColor,
      "&:not($cardHeaderIcon)": {
        ...mediumGreenCardHeader
      }
    },

    darkGreenCardHeader: {
      color: whiteColor,
      "&:not($cardHeaderIcon)": {
        ...darkGreenCardHeader
      }
    },

    redCardHeader: {
      color: whiteColor,
      "&:not($cardHeaderIcon)": {
        ...redCardHeader
      }
    },

    lightYellowCardHeader: {
      color: whiteColor,
      "&:not($cardHeaderIcon)": {
        ...lightYellowCardHeader
      }
    },

    yellowCardHeader: {
      color: whiteColor,
      "&:not($cardHeaderIcon)": {
        ...yellowCardHeader
      }
    },

    lightTealCardHeader: {
      color: whiteColor,
      "&:not($cardHeaderIcon)": {
        ...lightTealCardHeader
      }
    },

    tealCardHeader: {
      color: whiteColor,
      "&:not($cardHeaderIcon)": {
        ...tealCardHeader
      }
    },

    darkTealCardHeader: {
      color: whiteColor,
      "&:not($cardHeaderIcon)": {
        ...darkTealCardHeader
      }
    },

  };
  
  export {
    cardHeaderStyle,
    lightBlueCardHeader,
    blueCardHeader,
    darkBlueCardHeader,
    lightGreenCardHeader,
    greenCardHeader,
    mediumGreenCardHeader,
    darkGreenCardHeader,
    redCardHeader,
    lightYellowCardHeader,
    yellowCardHeader,
    lightTealCardHeader,
    tealCardHeader,
    darkTealCardHeader,
  };