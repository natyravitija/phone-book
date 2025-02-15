import React, { FC } from 'react';
import { Modal } from 'react-bootstrap';
import { Contact, Action } from '../types';
import ContactForm from './ContactForm';

interface EditModalProps {
  showModal: boolean; 
  dataToEdit: Contact | undefined; 
  toggleModal: () => void; 
  dispatch: React.Dispatch<Action>; // dispatch function from the useReducer hook
}

// A modal component that displays a form to edit a contact
const EditModal: FC<EditModalProps> = ({ toggleModal, dataToEdit, showModal, dispatch }) => {
  return (
    <Modal show={showModal} onHide={toggleModal}>
      <Modal.Header closeButton>
        <Modal.Title></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ContactForm
          dispatch={dispatch}
          dataToEdit={dataToEdit}
          toggleModal={toggleModal}
        />
      </Modal.Body>
    </Modal>
  );
};

export default EditModal;
