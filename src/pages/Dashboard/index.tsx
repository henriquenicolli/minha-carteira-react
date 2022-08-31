import React from 'react';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';

import { Container } from './styles'

const Dashboard: React.FC = () => {

    const options = [
        {value: 'Henrique', label: '1'},
        {value: 'Jose', label: '2'},
        {value: 'Ana', label: '3'},
    ];

    return (
        <Container>
            <ContentHeader title="Dashboard" lineColor="#F7931b">
                <SelectInput options={options}></SelectInput>
            </ContentHeader>
        </Container>
    );
}

export default Dashboard;