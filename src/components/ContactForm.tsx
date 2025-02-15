import React, { FC, ChangeEvent, useState } from 'react';
import { Action, Contact } from '../types';
import { Button, Form } from 'react-bootstrap';

interface ContactFormProps {
  dispatch: React.Dispatch<Action>;
  dataToEdit: Contact | undefined;
  toggleModal: () => void;
}

const ContactForm: FC<ContactFormProps> = ({ dispatch, dataToEdit, toggleModal }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [contact, setContact] = useState({
    firstName: dataToEdit?.firstName || '',
    lastName: dataToEdit?.lastName || '',
    phoneNumber: dataToEdit?.phoneNumber || '',
    address: dataToEdit?.address || '',
    email: dataToEdit?.email || '',
    city: dataToEdit?.city || '',
    country: dataToEdit?.country || '',
  });
  const [extraEmails, setExtraEmails] = useState<string[]>([]);
  const [extraPhoneNumbers, setExtraPhoneNumbers] = useState<string[]>([]);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>, index?: number, field?: string) => {
    const { name, value } = e.target;
    if (index !== undefined && field) {
      if (field === 'email') {
        setExtraEmails((prev) => {
          const newEmails = [...prev];
          newEmails[index] = value;
          return newEmails;
        });
      } else if (field === 'phoneNumber') {
        setExtraPhoneNumbers((prev) => {
          const newNumbers = [...prev];
          newNumbers[index] = value;
          return newNumbers;
        });
      }
    } else {
      setContact((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleAddFields = (field: 'email' | 'phoneNumber') => {
    if (field === 'email') {
      setExtraEmails([...extraEmails, '', '', '']);
    } else {
      setExtraPhoneNumbers([...extraPhoneNumbers, '', '', '']);
    }
  };

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { firstName, lastName, phoneNumber, address, email, city, country } = contact;
    if (!firstName.trim() || !lastName.trim() || !phoneNumber.trim() || !city.trim() || !country.trim() || !address.trim() || !email.trim()) {
      setErrorMessage('All the fields are required.');
      return;
    } else if (phoneNumber.length < 3) {
      setErrorMessage('Please enter a phone number with more than 3 numbers.');
      return;
    }
    if (!dataToEdit) {
      dispatch({
        type: 'ADD_CONTACT',
        payload: {
          id: Date.now(),
          ...contact,
          extraEmails,
          extraPhoneNumbers,
        },
      });
      setContact({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        address: '',
        email: '',
        city: '',
        country: '',
      });
      setExtraEmails([]);
      setExtraPhoneNumbers([]);
      setErrorMessage('');
    } else {
      dispatch({
        type: 'UPDATE_CONTACT',
        payload: {
          id: dataToEdit.id,
          updates: {
            id: Date.now(),
            ...contact,
            extraEmails,
            extraPhoneNumbers,
          },
        },
      });
      toggleModal();
    }
  };

  return (
    <Form onSubmit={handleOnSubmit} className="contact-form">
      <h3 className="mb-3">Register new contact</h3>
      {errorMessage && <p className='errorMsg'>{errorMessage}</p>}
      <Form.Group controlId="firstName">
        <Form.Label>Name</Form.Label>
        <Form.Control name="firstName" value={contact.firstName} type="text" placeholder="Enter the Name" onChange={handleOnChange} />
      </Form.Group>
      <Form.Group controlId="lastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control name="lastName" value={contact.lastName} type="text" placeholder="Enter Last Name" onChange={handleOnChange} />
      </Form.Group>
      <Form.Group controlId="address">
        <Form.Label>Address</Form.Label>
        <Form.Control name="address" value={contact.address} type="text" placeholder="Enter Address" onChange={handleOnChange} />
      </Form.Group>
      <Form.Group controlId="city">
        <Form.Label>City</Form.Label>
        <Form.Control name="city" value={contact.city} type="text" placeholder="Enter City" onChange={handleOnChange} />
      </Form.Group>
      <Form.Group controlId="country">
        <Form.Label>Country</Form.Label>
        <Form.Control name="country" value={contact.country} type="text" placeholder="Enter Country" onChange={handleOnChange} />
      </Form.Group>
      <Form.Group controlId="email">
        <Form.Label>Email</Form.Label>
        <div className="d-flex">
          <Form.Control name="email" value={contact.email} type="email" placeholder="Enter Email" onChange={handleOnChange} />
          <Button onClick={() => handleAddFields('email')} className='ms-2'>Add</Button>
        </div>
        {extraEmails.map((email, index) => (
          <Form.Control key={index} value={email} type="email" placeholder="Enter the Email" onChange={(e) => handleOnChange(e, index, 'email')} className="mt-2" />
        ))}
      </Form.Group>
      <Form.Group controlId="phoneNumber">
        <Form.Label>Number</Form.Label>
        <div className="d-flex">
          <Form.Control name="phoneNumber" value={contact.phoneNumber} type="text" placeholder="Enter Number" onChange={handleOnChange} />
          <Button onClick={() => handleAddFields('phoneNumber')} className='ms-2'>Add</Button>
        </div>
        {extraPhoneNumbers.map((phone, index) => (
          <Form.Control key={index} value={phone} type="text" placeholder="Enter the Number" onChange={(e) => handleOnChange(e, index, 'phoneNumber')} className="mt-2" />
        ))}
      </Form.Group>
      <div className="d-flex justify-content-end">
        <Button variant='primary' type='submit' className='submit-btn'>
          {dataToEdit ? 'Save' : 'Save'}
        </Button>
      </div>
    </Form>
  );
};

export default ContactForm;