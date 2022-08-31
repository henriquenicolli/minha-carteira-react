import React from 'react';

import { Container } from './styles';
import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';

const List: React.FC = () => {

    const options = [
        {value: 'Henrique', label: 'Henrique'},
        {value: 'Jose', label: 'Jose'},
        {value: 'Ana', label: 'Ana'},
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