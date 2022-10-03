import {FlexStyled} from '../../../../common/CommonStyles';
import React from 'react';
import {CurrencyData} from '../../../Main';
import {CurrencyHistory} from './CurrencyHistory/CurrencyHistory';

export type HistoryData = {
    priceUsd: string
    time: number
}
type Props = {
    data: CurrencyData
    historyData: HistoryData[]
    interval: string
    id: string
}
export const CurrencyPage: React.FC<Props> = ({data, historyData, interval, id}) => {
    return (
        <FlexStyled direction={'column'}>
            <h3>{data.name}</h3>
            <FlexStyled>
                <span>{'$ ' + (Number(data.priceUsd).toFixed(2)).toString()}</span>
                <span>{'$ ' + ((Number(data.marketCapUsd) / 1000000000).toFixed(2)).toString() + ' B'}</span>
                <span>{(Number(data.changePercent24Hr).toFixed(2)).toString() + ' %'}</span>
                <span>{'$ ' + ((Number(data.volumeUsd24Hr) / 1000000000).toFixed(2)).toString() + ' B'}</span>
            </FlexStyled>
            <CurrencyHistory id={id} interval={interval} historyData={historyData}/>
        </FlexStyled>
    )
}