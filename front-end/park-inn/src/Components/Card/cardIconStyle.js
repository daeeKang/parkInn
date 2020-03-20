import {  darkBlueCardHeader, 
          greenCardHeader, 
          redCardHeader, 
          yellowCardHeader, 
          lightBlueCardHeader, 
          tealCardHeader } 
from './cardHeaderStyle'; 

const cardIconStyle = {
    cardIcon: {
      "&$darkBlueCardHeader,&$greenCardHeader,&$redCardHeader,&$yellowCardHeader,&$lightBlueCardHeader,&$tealCardHeader": {
        borderRadius: "3px",
        backgroundColor: "fff",
        padding: "15px",
        marginTop: "-30px",
        marginRight: "15px",
        float: "left"
      }
    },

    darkBlueCardHeader,
    greenCardHeader,
    redCardHeader,
    yellowCardHeader,
    lightBlueCardHeader,
    tealCardHeader,
  };
  
  export default cardIconStyle;