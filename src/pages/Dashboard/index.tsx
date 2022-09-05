import React from 'react';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';

import { Container } from './styles'

const Dashboard: React.FC = () => {

    const options = [
        {value: 'Henrique', label: 'Henrique'},
        {value: 'Jose', label: 'Jose'},
        {value: 'Ana', label: 'Ana'},
    ];

    return (
        <Container>
            <ContentHeader title="Dashboard" lineColor="#F7931b">
                <SelectInput options={options} onChange={() => {}}></SelectInput>
            </ContentHeader>
        </Container>
    );
}

export default Dashboard;