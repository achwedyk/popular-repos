import React from 'react';
import styled from 'styled-components';

interface HeaderProps {
  title: string
}

const HeaderWrapper = styled.header`
  background-color: #55cbcd;
  min-height: 10vh;
  max-height: 20vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(12px + 2vmin);
  color: black;
`

export const Header = ({title}: HeaderProps) => <HeaderWrapper>{title}</HeaderWrapper>