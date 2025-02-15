import { Contact, Action, Update } from '../types';

export interface AppState {
    contacts: Contact[];
  }

  export const contactsReducer = (state: AppState, action: Action): AppState => {
    switch(action.type){
        case 'ADD_CONTACT':
            // Add a contact
            return {
              ...state,
              contacts: [...state.contacts, action.payload as Contact]
            };
        case 'UPDATE_CONTACT': {
             // Update an existing contact in the state
            const { id, updates } = action.payload as Update;
            return {
                ...state,
                contacts: state.contacts.map((contact) => {
                    if (contact.id === id) {
                        return {
                            ...contact,
                            ...updates
                        };
                    }
                    return contact;
                })
            };
        }
        case 'DELETE_CONTACT': {
          return {
              ...state,
              contacts: state.contacts.filter((contact) => contact.id !== action.payload) 
          };
      }
      
        
        default:
             // Return the current state if the action is unknown
            return state;
    }
}
