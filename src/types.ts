export interface Contact {
  id: number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: string;
    email: string;
    city: string;
    country: string;
    extraEmails?: string[]; 
    extraPhoneNumbers?: string[]; 
  }
  
  export interface Update {
    id: number;
    updates?: Contact;
  }
/*
  export interface Action {
    type: 'ADD_CONTACT' | 'UPDATE_CONTACT' | 'DELETE_CONTACT'
    payload: Contact | Update;
  }
*/

  export type Action =
  | { type: 'ADD_CONTACT'; payload: Contact }
  | { type: 'UPDATE_CONTACT'; payload: Update }
  | { type: 'DELETE_CONTACT'; payload: number };  
