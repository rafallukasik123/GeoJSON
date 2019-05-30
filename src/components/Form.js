import React, { Component } from 'react';

import Table from './Table';


class Form extends Component {
  constructor(props) {
    super(props);

  }


  render() {
    
    console.log(this.props);
    
    return (
     
     <div>


<input type="button" onClick={this.props.onClickBack}  />
     </div>
    
    );
  }
}

export default Form;