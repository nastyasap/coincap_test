import {Main} from './Main';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getCurrenciesTableData, getCurrentPage} from '../../store/selectors/currenciesTable';
import {currenciesTableSlice} from '../../store/reducers/currenciesTable';
import {Pagination} from '../Pagination/Pagination';
import {FlexStyled} from '../common/CommonStyles';

export const MainContainer = () => {
    const data = useSelector(getCurrenciesTableData)
    const currentPage = useSelector(getCurrentPage)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(currenciesTableSlice.actions.loadTableRequest(1))
    }, [dispatch])

    const setCurrentPage = (value: number) => {
        dispatch(currenciesTableSlice.actions.loadTableRequest(value))
    }

    return (
        <FlexStyled direction={'column'}>
            <Main currencyData={data}/>
            <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage}/>
        </FlexStyled>
    )
}