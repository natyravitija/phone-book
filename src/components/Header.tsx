import React, { FC } from 'react';
import { Container } from 'react-bootstrap';

const Header: FC = () => {
  return (
    <header className="header">
      <Container >
        <h1>PhoneBook</h1>
      </Container>
    </header>
  );
};

export default Header;
