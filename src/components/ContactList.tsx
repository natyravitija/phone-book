
import React, { FC } from 'react';
import { Contact, Action } from '../types';
import ContactItem from './ContactItem';

interface ContactListProps {
  contacts: Contact[];
  handleEdit: (id: number) => void;
  dispatch: React.Dispatch<Action>;
}

// Define the ContactList component using a functional component
const ContactList: FC<ContactListProps> = ({ contacts, handleEdit, dispatch }) => {
  return (
    <div className='contacts-list'>
      <h3 className='contacts-list-title'>Contacts</h3>
      <div className='contacts-list-table-container'>
        <table className='contacts-list-table'>
          <thead className='contacts-list-header'>
            <tr>
              <th>Name</th>
              <th>Last Name</th>
              <th>Address</th>
              <th>City</th>
              <th>Country</th>
              <th>Emails</th>
              <th>Numbers</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
  {contacts.map((contact) => (
    <ContactItem
      key={contact.id}
      {...contact} // Pass all contact properties as props
      handleEdit={handleEdit}
      dispatch={dispatch}
    />
  ))}
</tbody>

        </table>
      </div>
    </div>
  );
};

export default ContactList;
