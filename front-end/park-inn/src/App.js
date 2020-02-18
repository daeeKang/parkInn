import React, { Component } from 'react';
import { Button, ListItem} from '@material-ui/core'
import ListItemIcon from '@material-ui/core/ListItemIcon';
import HomeIcon from '@material-ui/icons/Home';

class App extends Component {
  render() {
    return (
      <div>
        Park Inn App
       
        <Button> Hi </Button>

        <ListItem>
          <ListItemIcon><HomeIcon/></ListItemIcon>
        </ListItem>
      </div>
    );
  }
}

export default App;
