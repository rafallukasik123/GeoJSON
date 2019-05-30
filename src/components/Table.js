import React, { Component } from 'react';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import Form from './Form';

const data_source = 'https://s3.eu-central-1.amazonaws.com/gissupport11oneone/ot_oikm_p.geojson';


class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [],
      rowData: [],
      rowClikedData:null,
      rowCliked : false,

    }
    this.handleClick=this.handleClick.bind(this);
  }

  
handleClick = (e) =>{
this.setState({
  rowClikedData : e.data,
  rowCliked : true
})
}

handleClickForm = (e) =>{

  
  this.setState({
    rowCliked : false
  })
}



  componentDidMount() {
  
   axios.get(data_source)
      .then(res => {

        const table = res.data.features;
        const table_header = res.data.features[0].properties;
        const keys = Object.keys(table_header);

        keys.forEach(element => {
          this.setState(
            {

              columnDefs: this.state.columnDefs.concat([{ headerName: element, field: element }])

            }


          )
        });





        table.forEach(element => {
          const object_final = {};

          keys.forEach(el => {

            const temp = element.properties[el];
            object_final[el] = temp;




          });
          this.setState(prevState => (
            {


              rowData: [...prevState.rowData, object_final]

            }


          )
          )



        });



      })
  }

  render() {


    if (this.state.columnDefs.length != 0) {


      if(!this.state.rowCliked){
        return (

          <div
            className="ag-theme-balham "
            style={{
              height: '500px',
              width: '1800px'
            }}
          >
            <AgGridReact 
              columnDefs={this.state.columnDefs}
              rowData={this.state.rowData} onRowClicked={this.handleClick} >
            </AgGridReact>
          </div>
        );
      }
      else{
        console.log(this.state.rowClikedData);

        return (
        <Form onClickBack={this.handleClickForm} rowClikedData={this.state.rowClikedData} />
        )
      }




      

    }
    else {
      return (
        <div>Trwa Ładowanie...</div>
      )
    }


  }
}

export default Table;