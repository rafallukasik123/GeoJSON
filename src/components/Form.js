import React, { Component } from 'react';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

const data_source='https://s3.eu-central-1.amazonaws.com/gissupport11oneone/ot_oikm_p.geojson';


class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [],
      rowData: []
    }
  }





  componentDidMount() {
    axios.get(data_source)
      .then(res => {

       const table=res.data.features;
        const table_header=res.data.features[0].properties;
       const keys=Object.keys(table_header);
     
       keys.forEach(element => {
        this.setState(
          {
          
            columnDefs: this.state.columnDefs.concat([{headerName: element, field: element}])
          
          }


        )
       });
        
      
      
       
     
       table.forEach(element => {
        const object_final={};

        keys.forEach(el => {
        
         const temp=element.properties[el];
         object_final[el]=temp;
        console.log(object_final);
        
          
          
      });
      this.setState(prevState =>(
        {
          
         
          rowData: [...prevState.rowData,object_final]

        }
       
        
      )
      )


     
       });
       
       
      
      })
  }
  
  render() {


if(this.state.columnDefs.length!=0){
  return (

    <div 
    className="ag-theme-balham "
    style={{ 
    height: '500px', 
    width: '1800px' }} 
  >
    <AgGridReact
    columnDefs={this.state.columnDefs}
    rowData={this.state.rowData}>
  </AgGridReact>
  </div>
  );

}
else{
  return (
  <div>Trwa Ładowanie...</div>
  )
}

    
  }
}

export default Form;