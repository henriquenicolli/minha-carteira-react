import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from "react-router-dom";
import { v4 } from 'uuid';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';

import gains from '../../repositories/gains';
import expenses from '../../repositories/expenses';
import formatCurrency from '../../utils/formatCurrency';
import formatDate from '../../utils/formatDate';
import listOfMonths from '../../utils/months';

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
    const [ monthSelected, setMonthSelected ] = useState<number>(new Date().getMonth() + 1);
    const [ yearSelected, setYearSelected ] = useState<number>(new Date().getFullYear());
    const [ frequencyFilterSelected, setFrequencyFilterSelected ] = useState(['recorrente', 'eventual']);

    const pageData = useMemo(() => {
        if (typeListRoute === 'entry-balance') {
            return {
                title: 'Entradas',
                lineColor: '#4E41F0',
                data: gains
        }} else { 
            return {
                title: 'Saidas',
                lineColor: '#E44C4E',
                data: expenses
            }
        }
    },[]);


    const months = useMemo(() => {
        return listOfMonths.map((month, index) => {
            return {
                value: index + 1,
                label: month
            }
        })
    },[]);


    const years = useMemo(() => {
        let uniqueYears: number[] = [];

        pageData.data.forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear();
            
            if (!uniqueYears.includes(year)) {
                uniqueYears.push(year);
            }
        });

        return uniqueYears.map(year => {
            return {
                value: year,
                label: year
            }
        });
    },[pageData.data]);


    const handleFrequencyClick = (frequency: string) => {
        const alreadySelected = frequencyFilterSelected.findIndex(item => item === frequency);

        if (alreadySelected >= 0) {
            const filtered = frequencyFilterSelected.filter(item => item != frequency);
            setFrequencyFilterSelected(filtered);
        } else {
            setFrequencyFilterSelected((prev) => [...prev, frequency]);
        }
    } 


    const handleMonthSelected = (month: string) => {
        try {
            const parseMonth = Number(month);
            setMonthSelected(parseMonth);
        } catch (error) {
            throw new Error('Invalid month value. Is accept 0 - 24');
        }
    }

    
    const handleYearSelected = (year: string) => {
        try {
            const parseYear = Number(year);
            setYearSelected(parseYear);
        } catch (error) {
            throw new Error('Invalid year value. Is accept integer numbers');
        }
    }

    
    useEffect(() => {
         const filteredData = pageData.data.filter( item => {
            const date = new Date(item.date);
            const month = date.getMonth() + 1;
            const year = date.getFullYear();

            return month === monthSelected && year === yearSelected && frequencyFilterSelected.includes(item.frequency);
         });

         const formattedData = filteredData.map(item => {
            return {
                id: v4(),
                description: item.description,
                frequency: item.frequency,
                amountFormatted: formatCurrency(Number(item.amount)),
                dateFormatted: formatDate(item.date),
                tagColor: item.frequency === 'recorrente' ? '#4E41F0' : '#E44C4E',
            }
        }); 

        setData(formattedData);
    }, [pageData.data, monthSelected, yearSelected, frequencyFilterSelected]);


    return (
        <Container>
            <ContentHeader title={pageData.title} lineColor={pageData.lineColor}>
                <SelectInput 
                options={months} 
                onChange={(e) => handleMonthSelected(e.target.value)} 
                defaultValue={monthSelected}></SelectInput>

                <SelectInput 
                options={years} 
                onChange={(e) => handleYearSelected(e.target.value)} 
                defaultValue={yearSelected}></SelectInput>
            </ContentHeader>

            <Filters>
                <button type="button" 
                className={`tag-filter tag-filter-recurrent ${frequencyFilterSelected.includes('recorrente') && 'tag-actived'}`}
                onClick={() => handleFrequencyClick('recorrente')}>Recorrentes</button>

                <button type="button" 
                className={`tag-filter tag-filter-eventual ${frequencyFilterSelected.includes('eventual') && 'tag-actived'}`}
                onClick={() => handleFrequencyClick('eventual')}>Eventuais</button>
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