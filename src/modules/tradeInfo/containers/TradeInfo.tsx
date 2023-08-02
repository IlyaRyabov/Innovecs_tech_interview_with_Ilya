import React, {ChangeEvent, useState, useEffect} from 'react';
import {useQueryClient, useQuery} from 'react-query';
import {TradeInfoGrid} from './Grid';
import {NormalizedModel, TradeInfoModel} from '../tradeInfo.types';
import {fetchTradeInfo} from '../tradeInfo.api';
import {
    getFilteredAndSortedTradeData,
    getTradeDataFromLocalStorage,
    saveTradeDataToLocalStorage
} from '../tradeInfo.helpers';
import {Search} from "../components/Search";
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
        const query = e.target.value.toLowerCase();

        if (data && query.length >= 2 && !cachedSearchData?.[query]) {
            const filteredData = getFilteredAndSortedTradeData(data, query);

            queryClient.setQueryData('searchResults', {
                ...cachedSearchData,
                [query]: filteredData,
            });
        }

        setQuery(query);
    };

    if (status === 'loading') {
        return <h1>Loading...</h1>;
    }

    return (
        <>
            <Search onChange={handleChange}/>
            <TradeInfoGrid data={cachedSearchData?.[query] || data}/>
        </>
    );
}
