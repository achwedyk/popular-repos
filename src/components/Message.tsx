import React from 'react';

interface MessageProps {
  label: string
}

export const Message = ({label}: MessageProps) => <div className="Message">{label}</div>