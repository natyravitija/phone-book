

import React, { FC } from 'react';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { Contact, Action } from '../types';

// Define the extra props that are not part of the Contact interface
interface ExtraProps {
  handleEdit: (id: number) => void;
  dispatch: React.Dispatch<Action>;
}

// Use the FC type to define the props that the ContactItem component expects
const ContactItem: FC<Contact & ExtraProps> = ({ id, firstName, lastName, address, city, country, phoneNumber, email, extraEmails = [], extraPhoneNumbers = [], handleEdit, dispatch }) => {
  // Use destructuring to extract the properties from the Contact object that was passed as a prop

  // Render the table row with the contact information
  return (
    <tr>
      <td>{firstName}</td>
      <td>{lastName}</td>
      <td>{address}</td>
      <td>{city}</td>
      <td>{country}</td>
      <td>{[email, ...extraEmails].filter(Boolean).join(", ")}</td> 
      <td>{[phoneNumber, ...extraPhoneNumbers].filter(Boolean).join(", ")}</td> 
      <td>
       
      {/* Edit button */}
      <button
          onClick={() => handleEdit(id)}
          style={{
            backgroundColor: 'green',
            color: 'white',
            padding: '5px 10px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Edit
        </button>

      </td>
      <td>
        {/* Delete button */}
        <button
          onClick={() => {
            const confirmDelete = window.confirm(
              `Are you sure you want to delete contact for user ${firstName} ${lastName}?`
            );
            if (confirmDelete) {
              dispatch({
                type: 'DELETE_CONTACT',
                payload:  id 
              });
            }
          }}
          style={{
            backgroundColor: 'red',
            color: 'white',
            padding: '5px 10px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ContactItem;