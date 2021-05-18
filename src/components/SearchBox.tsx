import React, {useEffect, useRef} from 'react';
import * as text from 'src/text.json';

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBox = ({onChange, value}: SearchBoxProps) => {
  const inputEl = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputEl && inputEl.current) {
      inputEl.current.select()
    }
  }, [inputEl])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value)
  }

  return <div className="SearchBox">
    <label className="SearchBox-label">{text.FILTER}</label>
    <input className="SearchBox-input" ref={inputEl} autoFocus={true} value={value} onChange={handleChange}/>
  </div>
}