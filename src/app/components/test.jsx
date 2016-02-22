import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Panel from 'react-bootstrap/lib/Panel';
import React from 'react';
import update from 'react-addons-update';
import RadioButton from 'material-ui/lib/radio-button';
import RadioButtonGroup from 'material-ui/lib/radio-button-group';

import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';
import RaisedButton from 'material-ui/lib/raised-button';

import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import NavigationClose from 'material-ui/lib/svg-icons/editor/format-list-numbered';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/lib/menus/menu-item';

import Sticky from 'react-sticky';

import Dialog from './modalNewTest';
import ReactDOM from 'react-dom';

const styles = {
  block: {
    maxWidth: 250,
  },
  radioButton: {
    marginBottom: 16,
  },
  content: {
    marginTop: 64,
  },

  saveButton: {
    marginTop: 12,
    marginBottom: 24,
  },
  errorInfo: {
    display: 'none',
  }
};

function handleTouchTapNewTest(){
  //alert('adasdas');
  ReactDOM.render(<Dialog />, document.getElementById('modal'));
};

var AppBarExampleIconMenu = React.createClass({
  render: function(){
    return(
      <Sticky>
        <Grid>
          <Row className="q1">
            <Col xs={12} md={12}>
            
              <AppBar
                title="Testovani otazek na urednickou zkousku"
                iconElementLeft={<IconButton><NavigationClose /></IconButton>}
                iconElementRight={
                  <IconMenu
                    iconButtonElement={
                      <IconButton><MoreVertIcon /></IconButton>
                    }
                    targetOrigin={{horizontal: 'right', vertical: 'top'}}
                    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                  >
                    <MenuItem primaryText="Spustit novy test" onTouchTap={this.props.showNewTestDialog} />
                    <MenuItem primaryText="Informace" onItemTouchTap={handleTouchTapNewTest} />
                  </IconMenu>
                }
              />
              
            </Col>
          </Row>
        </Grid>
      </Sticky>
    );
  }
});


var Question = React.createClass({
  getInitialState: function(){
    return {value: ''};
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    return this.props.key !== nextProps.key || this.props.error !== nextProps.error;
  },

  handleChange: function(event){
    this.setState({value: event.target.value});
    this.props.onAnswered({id: this.props.id, value: event.target.value});
  },

  render: function(){
    return(
      <Grid>
        <Row className="q1">
          <Col xs={12} md={12}>
            <Card>
              <CardHeader title={this.props.question} />
              <CardText>
                <div>
                  <RadioButtonGroup onChange={this.handleChange} name="shipSpeed" defaultSelected="not_light">
                    <RadioButton
                      value="A"
                      label={this.props.answerA}
                      style={styles.radioButton}
                      checked={this.props.selected}
                    />
                    <RadioButton
                      value="B"
                      label={this.props.answerB}
                      style={styles.radioButton}
                    />
                    <RadioButton
                      value="C"
                      label={this.props.answerC}
                      style={styles.radioButton}
                    />
                  </RadioButtonGroup>
                  {this.props.error != null ? <ErrorMessage /> : null}
                </div>
              </CardText>
            </Card>
          </Col> 
        </Row>
      </Grid>
    );
  }
});

var Buttons = React.createClass({

  render: function(){
    return(
      <Grid>
        <Row>
          <Col xs={12} md={10} />
          <Col xs={12} md={2}>
            <span className="pull-right">
              <RaisedButton label="Odeslat" secondary={true} style={styles.saveButton} onMouseUp={this.props.onSubmitTest}/>
            </span>
          </Col>
        </Row>
      </Grid>
    );
  }

});

var ErrorMessage = React.createClass({
  render: function(){
    return(
      <div className="alert alert-danger">
        <strong>Chyba!</strong> Indicates a dangerous or potentially negative action.
      </div>
    );
  }
});

var Test = React.createClass({

  loadQuestionsFromServer: function(numberOfQuestions) {
    $.ajax({
      type: 'GET',
      url: this.props.url,
      dataType: 'json',
      cache: false,
      data: {num: numberOfQuestions},
      success: function(data) {
        console.log(data);
        this.replaceState({showDialog: false, data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  handleSubmitTest: function(){

    var obj = {};
    this.state.data.forEach(function(value){
      if(value.correctOne !== value.selected){
        obj[value.id] = {error: {$set: 'Spravne hodnota je: ' + value.correctOne}};
      }else if(value.error !== null){
        obj[value.id] = {error: {$set: null}};
      }
    });
    var newState = update(this.state.data, obj);
    this.setState({data: newState, showDialog: this.state.showDialog});
  },

  handleAnswer: function(answer){
    //var x = answer.id;
    console.log(answer);

    var obj = {};
    obj[answer.id] = {selected: {$set: answer.value}};
    console.log(obj);
    var newState = update(this.state.data, obj);
    this.setState({data: newState, showDialog: this.state.showDialog});
  },

  handleCloseDialog: function(){
    //this.setState({data: this.state.data, showDialog: false});
  },

  handleOpenDialog: function(){
    this.setState({data: this.state.data, showDialog: true});
  },

  getInitialState: function(){
    //alert(questions.size());
    return {data: [], showDialog: true};
  },

  componentDidMount: function() {
    //this.loadQuestionsFromServer();
  },

  render: function(){
    return (
      <div>
        <AppBarExampleIconMenu showNewTestDialog={this.handleOpenDialog} />
        <div style={styles.content}>
            {this.state.data.map(function(value){
              return <Question 
                key={value.id} 
                id={value.id}
                question={value.value} 
                answerA={value.answerA} 
                answerB={value.answerB} 
                answerC={value.answerC} 
                onAnswered={this.handleAnswer}
                error={value.error}
              />
            }, this)}
            <Buttons onSubmitTest={this.handleSubmitTest} />
        </div>
        <Dialog handleCloseDialog={this.handleCloseDialog} 
                showNewTestDialog={this.state.showDialog} 
                loadNewQuestions={this.loadQuestionsFromServer}
        />
      </div>
    );
  }
});

export default Test;