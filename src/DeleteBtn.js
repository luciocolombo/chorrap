import React from 'react';
import { Button } from 'react-bootstrap';
import axios from './services/api';
function DeleteBtn({ dogId }) {
  function deleteItem(dogId) {
    axios.delete(`/deletedog/${dogId}`).then((res) => window.location.reload());
  }
  /* const instance = axios.create({
      withCredentials: true,
    });
    instance
      .delete(`https://mascotasperdidasapi.herokuapp.com/deletedog/${dogId}`)
      .then((res) => window.location.reload());
  } */
  return (
    <div>
      <Button onClick={() => deleteItem(dogId)} variant="danger">
        <i className="far fa-times-circle"></i>
      </Button>
    </div>
  );
}

export default DeleteBtn;
