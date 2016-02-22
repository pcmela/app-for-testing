import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';

function inputIsValid(input){
  var inputInt = parseInt(input);
  if(inputInt !== null && inputInt > 0 && inputInt < 301){
    return true;
  }else{
    return false;
  }
}

export default class DialogExampleDialogDatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfQuestions: 300,
      isValid: true,
    };
  }

  handleClose = () => {
    this.props.handleCloseDialog();
    this.props.loadNewQuestions(this.state.numberOfQuestions);
  }

  handleChange = (event) => {
    var num = parseInt(event.target.value);
    if (num !== null && num >= 1 && num <= 300) {
      this.setState({numberOfQuestions: event.target.value, isValid: true});
    }else{
      this.setState({numberOfQuestions: event.target.value, isValid: false});
    }
  }


  render() {
    const actions = [
      <FlatButton
        label="Ok"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
        disabled={!this.state.isValid}
      />,
    ];

    var inputNumber;
    if(this.state.isValid){
      inputNumber = <TextField
                      hintText="Pocet otazek"
                      floatingLabelText="Pocet otazek"
                      type="number"
                      value={this.state.numberOfQuestions}
                      onChange={this.handleChange.bind(this)}
                    />
    }else{
      inputNumber = <TextField
                      hintText="Pocet otazek"
                      floatingLabelText="Pocet otazek"
                      type="number"
                      value={this.state.numberOfQuestions}
                      onChange={this.handleChange.bind(this)}
                      errorText="Cislo musi byt v rozsahu 1 - 300!"
                    />
    }

    return (
      <div>
        <Dialog
          title="Dialog With Date Picker"
          actions={actions}
          modal={false}
          open={this.props.showNewTestDialog}
          onRequestClose={this.handleClose}
        >
          Open a Date Picker dialog from within a dialog.<br />
          {inputNumber}
        </Dialog>
      </div>
    );
  }
}