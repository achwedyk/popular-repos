import React from 'react';

interface HeaderProps {
  title: string
}

export const Header = ({title}: HeaderProps) => <header className="App-header">{title}</header>