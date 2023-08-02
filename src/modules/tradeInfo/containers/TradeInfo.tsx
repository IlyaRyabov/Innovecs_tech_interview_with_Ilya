import React, {ChangeEvent, useState, useEffect} from 'react';
import {useQueryClient, useQuery} from 'react-query';
import {Input as Search} from 'ui/Input';
import {TradeInfoContainer} from './TradeInfoContainer';
import {NormalizedModel, TradeInfoModel} from '../tradeInfo.types';
import {fetchTradeInfo} from '../tradeInfo.api';
import {
    getFilteredAndSortedTradeData,
    getTradeDataFromLocalStorage,
    saveTradeDataToLocalStorage
} from '../tradeInfo.helpers';
import dataSource from '../dataSource.json';

const tradeInfoData = dataSource as TradeInfoModel[];

export const TradeInfo = (): JSX.Element => {
    const queryClient = useQueryClient();
    const tradeDataFromLocalStorage: NormalizedModel[] | undefined = getTradeDataFromLocalStorage();

    const [query, setQuery] = useState<string>('');

    const {data, status} = useQuery<NormalizedModel[] | undefined>(
        'tradeInfo',
        () => fetchTradeInfo(tradeInfoData),
        {initialData: tradeDataFromLocalStorage}
    );

    const {data: cachedSearchData} = useQuery<Record<string, NormalizedModel[]>>(
        'searchResults',
        () => queryClient.getQueryData<Record<string, NormalizedModel[]>>('searchResults') || {},
    );

    useEffect(() => {
        if (data && !tradeDataFromLocalStorage) {
            saveTradeDataToLocalStorage(data);
        }
    }, [data, tradeDataFromLocalStorage]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toLowerCase();

        if (data && value.length >= 2 && !cachedSearchData?.[value]) {
            const filteredData = getFilteredAndSortedTradeData(data, value);

            const updatedSearchResults = {
                ...cachedSearchData,
                [value]: filteredData,
            };

            queryClient.setQueryData('searchResults', updatedSearchResults);
        }

        setQuery(value);
    };

    if (status === 'loading') {
        return <h1>Loading...</h1>;
    }

    return (
        <>
            <Search
                isDisabled={false}
                onChange={handleChange}
            />
            <TradeInfoContainer data={cachedSearchData?.[query] || data}/>
        </>
    );
}
