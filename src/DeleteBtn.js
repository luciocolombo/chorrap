import React from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
function DeleteBtn({ dogId }) {
  function deleteItem(dogId) {
    const instance = axios.create({
      withCredentials: true,
    });
    instance
      .delete(`http://localhost:4000/deletedog/${dogId}`)
      .then((res) => console.log(res));
  }
  return (
    <div>
      <Button onClick={() => deleteItem(dogId)} variant="danger">
        <i className="far fa-times-circle"></i>
      </Button>
    </div>
  );
}

export default DeleteBtn;
