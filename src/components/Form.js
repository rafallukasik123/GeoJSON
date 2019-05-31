import React, { Component } from 'react';

import Table from './Table';

import styled from 'styled-components';

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = ({
      properties: this.props.rowClikedData,

    })

    this.generateField = this.generateField.bind(this);
  }

  generateField(key) {

    const Div = styled.div`
    display: flex;
    flex-direction: row;
    margin : 3px;
    justify-content: space-between;
    
    width: 100%;
    position: relative; 
    &::after {
      display: block;
        content: '';
       width: 100%;
       height: 1px;
       background: black;
       position: absolute;
       bottom: 0;
       left: 0;
     }

     &:hover {
      color: red;
    }

     /*&::before {
      display: block;
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 1px;
      background: black;
    }*/
    `;



    return (
      <Div key={key}> <label > {key}</label>  <output>{this.state.properties[key]}</output>  </Div>
    )





  }


  render() {

    const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    width: 30%;
    height: 100%;
    font-size: 20px;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif
    margin: 4%;
    padding: 2%;
    border: solid black 2px;
   

    `;





    const keys = this.props.keys;
    const values = keys.map(this.generateField);


    return (

      <Form>
        {values}

        <input type="button" onClick={this.props.onClickBack} value="Powrót" />
      </Form>

    );
  }
}

export default Form;