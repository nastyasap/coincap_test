import axios from "axios";
import {CurrencyData} from '../components/Main/Main';
import {HistoryData} from '../components/Main/Table/TableRows/CurrencyPage/CurrencyPage';
import {ROWS_PER_PAGE} from '../store/sagas/currenciesTable';

const instance = axios.create({
    baseURL: 'api.coincap.io/v2/assets'
})

export const currenciesApi = {
    getDataTable(offset: number, limit: number = ROWS_PER_PAGE) {
        return instance.get<{ data: CurrencyData[] }>('', {params: {limit, offset}})
    },
    getCurrency(id: string) {
        return instance.get<CurrencyData>(`/${id}`)
    },
    getCurrencyHistory(id: string, interval: string) {
        return instance.get<HistoryData[]>(`/${id}/history?interval=${interval}`)
    }
}