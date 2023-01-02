import axios from 'axios'
const url = '/api/persons'
//changed to /api/persons from /persons lets see if it works

const getData = () => {
    const request = axios.get(url)
    return (
        request.then(response => response.data)
    )
}

const postData = (object) => {
    const request = axios.post(url,object)
    console.log('HEEEEEERE', request.then(response => response.data));
    return (
        request.then(response => response.data)
    )
}

const deleteData = (id) => {
    const request = axios.delete(`${url}/${id}`)
    return (
        request.then(alert('Deletion was succesfull'))
    )
}

const changeData =  (object) => {
    console.log(object.id);
    const request = axios.put(`${url}/${object.id}`,object)
    return (
        request.then(response => response.data)
    )
}

export default {getData,postData,deleteData,changeData}