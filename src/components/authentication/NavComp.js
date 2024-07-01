import React, { useContext, useState } from 'react';
import { Button } from "react-bootstrap";
import { LoginComp } from './LoginComp';
import { RegisterComp } from './RegisterComp';
import { AuthContext } from '../../context/AuthContext';
import logoImg from '../../assets/logo1.png';
import styled from 'styled-components';

const StyledNav = styled.nav`
  background-color: #d69496;
  border: 1px solid #dddddd;
  height: 100px;
  width: 100%;
`;

const NavContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
`;

const BrandContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  height: 80px;
  filter: brightness(0) invert(1);
`;

const BrandText = styled.span`
  color: #ffffff;
  margin-left: 10px;
  font-size: 1.5em;
  font-weight: bold;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CustomButton = styled.div`
  margin-left: 10px;
  padding: 8px 16px;
  background-color: #dc3545;
  color: #ffff;
  border: 2px solid #dc3545;
  cursor: pointer;
  font-size: 1em;
  font-weight: bold;
  transition: all 0.3s ease;

  &:hover {
    background-color: transparent;
    color: #ffffff;
    border-color: #ffffff;
  }
`;

const EmailContainer = styled.div`
  padding: 6px 12px;
  background-color: #d69496;
  color: #ffffff;
  border: 2px solid #d69496;
  font-size: 0.9em;
  font-weight: bold;
`;

export const NavComp = () => {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <StyledNav className="navbar sticky-top navbar-light">
      <NavContainer className="container-fluid">
        <BrandContainer className="navbar-brand">
          <Logo src={logoImg} alt="logo" className="custom-logo" />
          <BrandText>L'Enchere Royale</BrandText>
        </BrandContainer>
        <ButtonContainer className="d-flex align-items-center">
          {currentUser ? (
            <>
              <EmailContainer>{currentUser.email}</EmailContainer>
              <CustomButton onClick={() => logout()}>
                Cerrar sesión
              </CustomButton>
            </>
          ) : (
            <>
              <LoginComp />
              <RegisterComp />
            </>
          )}
        </ButtonContainer>
      </NavContainer>
    </StyledNav>
  );
};

