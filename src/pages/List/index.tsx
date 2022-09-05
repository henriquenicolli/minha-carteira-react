import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';

import gains from '../../repositories/gains';
import expenses from '../../repositories/expenses';
import formatCurrency from '../../utils/formatCurrency';
import formatDate from '../../utils/formatDate';

import { Container, Content, Filters } from './styles';


interface IData {
    id: string;
    description: string;
    amountFormatted: string;
    frequency: string;
    dateFormatted: string;
    tagColor: string;
}

const List: React.FC = () => {

    const { typeListRoute } = useParams();
    const [ data, setData ] = useState<IData[]>([]);
    const [ monthSelected, setMonthSelected ] = useState<string>(String(new Date().getMonth() + 1));
    const [ yearSelected, setYearSelected ] = useState<string>(String(new Date().getFullYear()));

    const title =  typeListRoute === 'entry-balance' ? 'Entradas' : 'Saidas';
    const lineColor = typeListRoute === 'entry-balance' ? '#F7931b' : '#E44C4E';
    const listData = typeListRoute === 'entry-balance' ? gains : expenses;

    const months = [
        {value: 1, label: 'Janeiro'},
        {value: 2, label: 'Fevereiro'},
        {value: 3, label: 'Marco'},
        {value: 4, label: 'Abril'},
        {value: 5, label: 'Maio'},
        {value: 6, label: 'Junho'},
        {value: 7, label: 'Julho'},
        {value: 8, label: 'Agosto'},
        {value: 9, label: 'Setembro'},
        {value: 10, label: 'Outubro'},
        {value: 11, label: 'Novembro'},
        {value: 12, label: 'Dezembro'},
    ];

    const years = [
        {value: 2023, label: '2023'},
        {value: 2022, label: '2022'},
        {value: 2021, label: '2021'},
        {value: 2020, label: '2020'},
    ];
    
    useEffect(() => {
         const filteredData = listData.filter( item => {
            const date = new Date(item.date);
            const month = String(date.getMonth() + 1);
            const year = String(date.getFullYear());

            return month === monthSelected && year === yearSelected;
         });

         const formattedData = filteredData.map(item => {
            return {
                id: String(new Date().getTime() + item.amount),
                description: item.description,
                frequency: item.frequency,
                amountFormatted: formatCurrency(Number(item.amount)),
                dateFormatted: formatDate(item.date),
                tagColor: item.frequency === 'recorrente' ? '#4E41F0' : '#E44C4E',
            }
        }); 

        setData(formattedData);
    }, [listData, monthSelected, yearSelected]);

    return (
        <Container>
            <ContentHeader title={title} lineColor={lineColor}>
                <SelectInput options={months} onChange={(e) => setMonthSelected(e.target.value)} defaultValue={monthSelected}></SelectInput>
                <SelectInput options={years}  onChange={(e) => setYearSelected(e.target.value)} defaultValue={yearSelected}></SelectInput>
            </ContentHeader>

            <Filters>
                <button type="button" 
                className="tag-filter  tag-filter-recurrent">Recorrentes</button>

                <button type="button" 
                className="tag-filter tag-filter-eventual">Eventuais</button>
            </Filters>

            <Content>
                {
                    data.map( item => (
                        <HistoryFinanceCard
                            key={item.id}
                            tagColor={item.tagColor}
                            title={item.description}
                            subtitle={item.dateFormatted}
                            amount={item.amountFormatted}></HistoryFinanceCard>
                    ))
                }
                
            </Content>

        </Container>
    );
}

export default List;