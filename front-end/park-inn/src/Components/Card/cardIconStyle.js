import {  lightBlueCardHeader,
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
          darkTealCardHeader, } 
from './cardHeaderStyle'; 

const cardIconStyle = {
    cardIcon: {
      "&$lightBlueCardHeader,&$blueCardHeader,&$darkBlueCardHeader,&$lightGreenCardHeader,&$greenCardHeader,&$mediumGreenCardHeader,&$darkGreenCardHeader,&$redCardHeader,&$lightYellowCardHeader,&$yellowCardHeader,&$lightTealCardHeader,&$tealCardHeader,&$darkTealCardHeader": {
        borderRadius: "3px",
        backgroundColor: "fff",
        padding: "15px",
        marginTop: "-30px",
        marginRight: "15px",
        float: "left"
      }
    },

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
  
  export default cardIconStyle;