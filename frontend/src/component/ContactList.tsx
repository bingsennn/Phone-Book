// src/ContactList.tsx
import React, { useEffect, useState } from 'react';
import Contact from './Contact';
import { IContactListProps, IContactProps } from '../interface'

const ContactList: React.FC<IContactListProps> = ({ data }) => {
  return (
    <div>
      {
        data.map((contact) => (
            <Contact key={contact.guid} name={contact.name} phoneNumber={contact.phoneNumber} address={contact.address} />
        ))
      }
    </div>
  );
};

export default ContactList;
