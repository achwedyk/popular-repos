import React from 'react';
import styled from 'styled-components';

interface MessageProps {
  label: string
}

export const Wrapper = styled.div`
  margin: 16px;
`

export const Message = ({label}: MessageProps) => <Wrapper>{label}</Wrapper>