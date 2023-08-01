import {ChangeEvent} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Search as SearchComponent} from '../components/Search';
import {isTradeInfoLoading} from '../tradeInfo.selectors';
import {getFilteredAndSortedData} from '../tradeInfo.actions';

export const Search = (): JSX.Element => {
    const dispatch = useDispatch();
    const isLoading: boolean = useSelector(isTradeInfoLoading);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {value} = e.currentTarget;

        dispatch(getFilteredAndSortedData(value));
    };

    return (
        <SearchComponent
            isDisabled={isLoading}
            onChange={handleChange}
        />
    );
};
