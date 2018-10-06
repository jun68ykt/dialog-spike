/* eslint-disable react/no-multi-comp */

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import blue from '@material-ui/core/colors/blue';

const emails = ['user01@gmail.com', 'user02@gmail.com', 'user03@gmail.com'];
const styles = {
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
};

class SimpleDialog extends React.Component {
  itemElements = {};

  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  handleListItemKeyDown = (event, value) => {
    if (event.key === 'Enter')
      this.props.onClose(value);
  };

  render() {
    const { classes, onClose, selectedValue, ...other } = this.props;

    return (
      <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
        <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
        <div>
          <List>
            {emails.map(email => (
              <ListItem
                button
                ref={(e) => { this.itemElements[email] = ReactDOM.findDOMNode(e); }}
                onMouseOver={() => { this.itemElements[email].focus(); }}
                onMouseOut={() => { this.itemElements[email].blur(); }}
                onKeyDown={(event) => this.handleListItemKeyDown(event, email)}
                key={email}>
                <ListItemAvatar>
                  <Avatar className={classes.avatar}>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={email} />
              </ListItem>
            ))}
            <ListItem
              button
              ref={(e) => { this.itemElements['addAccount'] = ReactDOM.findDOMNode(e); }}
              onMouseOver={() => { this.itemElements['addAccount'].focus(); }}
              onMouseOut={() => { this.itemElements['addAccount'].blur(); }}
              onKeyDown={(event) => this.handleListItemKeyDown(event, 'addAccount')}
              >
              <ListItemAvatar>
                <Avatar>
                  <AddIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="add account" />
            </ListItem>
          </List>
        </div>
      </Dialog>
    );
  }
}

SimpleDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  selectedValue: PropTypes.string,
};

const SimpleDialogWrapped = withStyles(styles)(SimpleDialog);

const OpenButton = withStyles({
  root: {
    color: 'white',
    backgroundColor: '#888',
  }
})(Button);

class SimpleDialogDemo extends React.Component {
  state = {
    open: false,
    selectedValue: emails[1],
  };

  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = value => {
    this.setState({ selectedValue: value, open: false });
  };

  render() {
    return (
      <div>
        <Typography variant="subheading">Selected: {this.state.selectedValue}</Typography>
        <br />
        <OpenButton onClick={this.handleClickOpen} disableRipple>
          Open simple dialog
        </OpenButton>
        <SimpleDialogWrapped
          selectedValue={this.state.selectedValue}
          open={this.state.open}
          onClose={this.handleClose}
        />
      </div>
    );
  }
}

export default SimpleDialogDemo;
