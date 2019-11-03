import React from 'react'
import { compose, withState, withHandlers, lifecycle } from 'recompose'
import instance from '../libs/axios'
import swal from 'sweetalert2'
import { Container } from '../styles/Global'
import { Table } from 'react-bootstrap';

// Renders cities table 
const Cities = props => (
  <Container className="container">
    <h1>Cities</h1>
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>City Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            props.cities.map((c, index) => (
              <tr key={c._id}>
                <td>{c.name}</td>
                <td style={{float: 'right'}}>
                  <button
                    className="btn btn-danger pull-right point"
                    onClick={e => props.onDelete(e,c)}
                  >
                    <i className="fa fa-trash" />
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </div>
    <button
      className="btn btn-info point"
      //onClick={e => props.addCity()}
    >
      + Add city
    </button>
  </Container>
  
)

const CitiesCompose = compose(
  withState('cities', 'setCities', []),
  
  lifecycle({
    async componentDidMount() {
      
      // get cities
      let cities = await instance.get(`/city`).then(resp => {
        if (resp.data.status) {
          return resp.data.data.allcities
        }
        else return false
      })

      if(cities){
        this.props.setCities(cities.sort())///////////////////////////////
      }   
    }
  }),
  withHandlers({
    // Delete city upon confirmation
    onDelete: props => async (e,city) => {
      e.preventDefault()
      if (city !== undefined) {
         swal({
           title: 'Delete',
           text: `Are you sure to delete city '${city.name}'`,
           showCancelButton: true,
           reverseButtons: true,
           confirmButtonText: 'Confirm',
           confirmButtonColor: '#1BB7BF',
           customClass: 'Button',
           showLoaderOnConfirm: true,
           preConfirm: () => {
             return new Promise((resolve, reject) => {
               instance.post(`/city/delete`, {
                 _id: city._id,
               }).then(data => {
                 resolve(data.data)
               })
             })
           }
         }).then(async (data) => {
           if (data.status) {
              props.setCities([])
              swal({
               title: 'Success',
               text: `City Deleted`,
               type: 'success',
               confirmButtonText: 'OK',
               confirmButtonColor: '#1BB7BF'
              })
              let cities = await instance.get(`/city`)
               .then(resp => resp.data.data.allcities)
              props.setCities(cities.sort())

           } else {
             swal({
               title: 'Failed',
               text: `Failed to delete city, please try again.`,
               type: 'warning',
               confirmButtonText: 'OK',
               confirmButtonColor: '#1BB7BF'
             })
           }
         }, function(dismiss) {
           if (dismiss === 'cancel' || dismiss === 'close') {
             // ignore
           }
         })
       }
     },

  })
)(Cities)

export default CitiesCompose
