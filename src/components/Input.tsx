import React, { useState } from "react";
import classnames from "classnames";

type TextProps = {
    placeholder: string;
    multiline?: boolean;
    className?: string;
    onChange?: (value: string) => void;
}

const Input: React.FC<TextProps> = ({ placeholder, multiline = false, className = "", onChange }) => {
    const [text, setText] = useState('');

    const changed = <T extends { value: string }>({ target: { value } }: React.ChangeEvent<T>) => {
        setText(value);
        onChange?.(value);
    }

    return (multiline ?
        <textarea className={classnames("base-input", className)} rows={10} placeholder={placeholder} value={text} onChange={changed} /> :
        <input className={classnames("base-input", className)} placeholder={placeholder} value={text} onChange={changed} />);
};

export default Input;