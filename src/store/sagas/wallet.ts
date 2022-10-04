import {all, call, put, takeLatest} from '@redux-saga/core/effects';
import {currenciesApi} from '../../api/api';
import {walletSlice} from '../reducers/wallet';
import {CurrencyData} from '../../components/Main/Main';

function* getCurrentCurrenciesPrice({payload}: ReturnType<typeof walletSlice.actions.loadWalletRequest>) {
    const {data} = yield call(currenciesApi.getDataTable, 0, undefined, payload.join(','))
    const object = (data as CurrencyData[]).reduce((acc: { [id: string]: number }, currency) => {
        acc[currency.id] = Number(currency.priceUsd)
        return acc
    }, {})

    yield put(walletSlice.actions.loadWalletSuccess(object))
}

function* addCurrentCurrencyPrice({payload}: ReturnType<typeof walletSlice.actions.addCurrencyToWalletRequest>) {
    const data: CurrencyData = yield call(currenciesApi.getCurrency, payload.id)
    yield put(walletSlice.actions.addCurrencyToWalletSuccess({
        id: payload.id,
        count: payload.count,
        priceUsd: Number(data.priceUsd)
    }))
}

function* deleteCurrentCurrencyPrice({payload}: ReturnType<typeof walletSlice.actions.deleteCurrencyFromWalletRequest>) {
    const data: CurrencyData = yield call(currenciesApi.getCurrency, payload.id)
    yield put(walletSlice.actions.deleteCurrencyFromWalletSuccess({
        id: payload.id,
        count: payload.count,
        priceUsd: Number(data.priceUsd)
    }))
}

export function* walletSaga() {
    yield all([
        takeLatest(walletSlice.actions.loadWalletRequest.type, getCurrentCurrenciesPrice),
        takeLatest(walletSlice.actions.addCurrencyToWalletRequest.type, addCurrentCurrencyPrice),
        takeLatest(walletSlice.actions.deleteCurrencyFromWalletRequest.type, deleteCurrentCurrencyPrice),
    ])
}