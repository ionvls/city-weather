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
    <div className="row">
      <div className="col-6">

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
        <div>
          <select id="cities" onChange={e => props.setSelectedCity(e.target.value)}>
            <option value="">Select city</option>
            <option value="Athens">Athens</option>
            <option value="London">London</option>
            <option value="Paris">Paris</option>
          </select>
          <button
            className="btn btn-success point"
            onClick={e => props.addCity(e)}
          >
            + Add city
          </button>
        </div>
        <div style={{marginTop: '15pt', marginBottom: '15pt'}}>
          <button 
          className="btn btn-info point"
          onClick={e => props.performCheck(e)}
          disabled={props.checksDisabled}  
          >Perform temperature check</button>
        </div>
      
      </div>
      <div className="col-6">
        {
          props.temps !== undefined && props.temps.length > 0 &&
            <div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>City Name</th>
                  <th>Min</th>
                  <th>Max</th>
                  <th>Avg</th>
                </tr>
              </thead>
              <tbody>
                {
                  props.temps.map((c, index) => (
                    <tr key={c._id}>
                      <td>{c.city_name}</td>
                      <td>{c.min}</td>
                      <td>{c.max}</td>
                      <td>{c.avg.toFixed(2)}</td>
                    </tr>
                  ))
                }
              </tbody>
            </Table>
            </div>
        }
        </div>
      </div>
  </Container>
  
)
async function refreshCities(props) {
  let cities = await instance.get(`/city`).then(resp => {
    if (resp.data.status) {
      return resp.data.data.allCities;
    }
    else
      return false;
  });
    if (cities && cities.length>0) {
      props.setChecksDisabled(false)
      props.setCities(cities.sort(function(a, b) {
        return a.name > b.name;
      }))
  } else {
    props.setChecksDisabled(true)
  }
}

const CitiesCompose = compose(
  withState('cities', 'setCities', []),
  withState('selectedCity', 'setSelectedCity', ""),
  withState('temps', 'setTemps', []),
  withState('checksDisabled', 'setChecksDisabled', true),

  lifecycle({
    async componentDidMount() {
      
      // get cities
      await refreshCities(this.props) 
    }
  }),
  withHandlers({
    performCheck: props => async (e) => {
      props.setChecksDisabled(true)
      let res = await instance.get(`/check/perform`).then(resp => {
        if (resp.data.status) {
          return resp.data.data.results
        }
        else
          return false
      })
      if (res) {
        props.setTemps(res.sort(function(a, b) {
          return a.city_name > b.city_name;
        }))
      }
      props.setChecksDisabled(false)
    },
    // add city
    addCity: props => async (e) => {
      e.preventDefault()
      if (props.selectedCity !== undefined && props.selectedCity !== "") {
         swal({
           title: 'Add City',
           text: `Are you sure to add city '${props.selectedCity}'`,
           showCancelButton: true,
           reverseButtons: true,
           confirmButtonText: 'Confirm',
           confirmButtonColor: '#1BB7BF',
           customClass: 'Button',
           showLoaderOnConfirm: true,
           preConfirm: () => {
             return new Promise((resolve, reject) => {
               instance.post(`/city/create`, {
                 name: props.selectedCity
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
               text: `City Added`,
               type: 'success',
               confirmButtonText: 'OK',
               confirmButtonColor: '#1BB7BF'
              })
              await refreshCities(props)

           } else {
             swal({
               title: 'Failed',
               text: data.error,
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
               instance.delete(`/city/delete/${city._id}`)
                .then(data => {
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
              await refreshCities(props) 

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
    }

  })
)(Cities)

export default CitiesCompose
