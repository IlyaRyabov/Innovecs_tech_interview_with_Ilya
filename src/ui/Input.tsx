import {ChangeEvent} from 'react';

type Props = {
    isDisabled: boolean,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const Input = (props: Props) => {
    const {isDisabled, onChange} = props;

    return (
        <input
            type="text"
            onChange={onChange}
            disabled={isDisabled}
        />
    );
};
