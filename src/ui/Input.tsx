import {ChangeEvent} from 'react';
import './Input.css';

type Props = {
    placeholder?: string,
    isDisabled?: boolean,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
};

export const Input = (props: Props) => {
    const {placeholder, isDisabled, onChange} = props;

    return (
        <input
            className="input"
            type="text"
            placeholder={placeholder}
            onChange={onChange}
            disabled={isDisabled}
        />
    );
};
