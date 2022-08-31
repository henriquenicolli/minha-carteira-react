import React from 'react';

import { Container } from './styles';
import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';

const List: React.FC = () => {

    const options = [
        {value: 'Henrique', label: '1'},
        {value: 'Jose', label: '2'},
        {value: 'Ana', label: '3'},
    ];

    return (
        <Container>
            <ContentHeader title="Saidas" lineColor="#E44">
                <SelectInput options={options}></SelectInput>
            </ContentHeader>
        </Container>
    );
}

export default List;