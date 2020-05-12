const grayColor = [
    "#999",
    "#777",
    "#3C4858",
    "#AAAAAA",
    "#D2D2D2",
    "#DDD",
    "#b4b4b4",
    "#555555",
    "#333",
    "#a9afbb",
    "#eee",
    "#e7e7e7"
];

const title = {
    color: grayColor[2],
    textDecoration: "none",
    fontWeight: "300",
    marginTop: "30px",
    marginBottom: "25px",
    minHeight: "32px",
    fontFamily: "'Helvetica', 'Helvetica Neue', 'Muli'",
    "& small": {
      color: grayColor[1],
      fontWeight: "400",
      lineHeight: "1"
    }
  };
  
const cardTitle = {
    ...title,
    marginTop: "0",
    marginBottom: "3px",
    minHeight: "auto",
    textTransform: "uppercase",
    "& a": {
      ...title,
      marginTop: ".625rem",
      marginBottom: "0.75rem",
      minHeight: "auto"
    }
  };
  
  const cardSubtitle = {
    marginTop: "-.375rem"
  };
  
  const cardLink = {
    "& + $cardLink": {
      marginLeft: "1.25rem"
    }
  };