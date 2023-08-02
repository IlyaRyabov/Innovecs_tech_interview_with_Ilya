import {ChangeEvent} from 'react';
import {Input} from 'ui/Input';
import './Search.css';

type Props = {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
};

export const Search = (props: Props) => {
    const {onChange} = props;

    return (
        <div className="search">
            <Input
                placeholder="Search"
                onChange={onChange}
            />
        </div>
    )
};
