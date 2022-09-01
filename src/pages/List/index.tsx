import React, {useMemo} from 'react';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';
import { useParams } from "react-router-dom";

import { Container, Content, Filters } from './styles';

const List: React.FC = () => {

    const { typeListRoute }  = useParams();

    const title =  typeListRoute === 'entry-balance' ? 'Entradas' : 'Saidas';
    const lineColor = typeListRoute === 'entry-balance' ? '#F7931b' : '#E44C4E';

    const months = [
        {value: 7, label: 'Julho'},
        {value: 8, label: 'Agosto'},
        {value: 9, label: 'Setembro'},
    ];

    const years = [
        {value: 2022, label: '2022'},
        {value: 2021, label: '2021'},
        {value: 2020, label: '2020'},
    ];

    return (
        <Container>
            <ContentHeader title={title} lineColor={lineColor}>
                <SelectInput options={months}></SelectInput>
                <SelectInput options={years}></SelectInput>
            </ContentHeader>

            <Filters>
                <button type="button" 
                className="tag-filter  tag-filter-recurrent">Recorrentes</button>

                <button type="button" 
                className="tag-filter tag-filter-eventual">Eventuais</button>
            </Filters>

            <Content>
                <HistoryFinanceCard
                    tagColor="#e44c4e"
                    title="Conta de Luz"
                    subtitle="31/08/2022"
                    amount="R$ 150,00"></HistoryFinanceCard>
            </Content>

        </Container>
    );
}

export default List;