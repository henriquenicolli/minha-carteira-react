import React from 'react';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';

import { Container, Content } from './styles';

const List: React.FC = () => {

    const options = [
        {value: 'Henrique', label: 'Henrique'},
        {value: 'Jose', label: 'Jose'},
        {value: 'Ana', label: 'Ana'},
    ];

    return (
        <Container>
            <ContentHeader title="Saidas" lineColor="#E44C4E">
                <SelectInput options={options}></SelectInput>
            </ContentHeader>

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