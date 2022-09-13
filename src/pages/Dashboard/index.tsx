import React, { useState, useEffect, useMemo } from 'react';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import WalletBox from '../../components/WalletBox';
import MessageBox from '../../components/MessageBox';
import PieChartBox from '../../components/PieChartBox';

import gains from '../../repositories/gains';
import expenses from '../../repositories/expenses';
import listOfMonths from '../../utils/months';

import happyImg from '../../assets/happy.svg';
import sadImg from '../../assets/sad.svg';
import grinningImg from '../../assets/grinning.svg';

import { Container, Content } from './styles'

const Dashboard: React.FC = () => {

    const [ monthSelected, setMonthSelected ] = useState<number>(new Date().getMonth() + 1);
    const [ yearSelected, setYearSelected ] = useState<number>(new Date().getFullYear());
    
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

        [...expenses, ...gains].forEach(item => {
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
    },[]);


    const totalExpenses = useMemo(() => {
        let total: number = 0;

        expenses.forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;

            if(month === monthSelected && year === yearSelected) {
                try {
                    total += Number(item.amount);
                } catch (error) {
                    throw new Error('Invalid amount!');
                }
            }
        });

        return total;
    },[monthSelected, yearSelected]);


    const totalGains = useMemo(() => {
        let total: number = 0;

        gains.forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;

            if(month === monthSelected && year === yearSelected) {
                try {
                    total += Number(item.amount);
                } catch (error) {
                    throw new Error('Invalid amount!');
                }
            }
        });

        return total;
    },[monthSelected, yearSelected]);


    const totalBalance = useMemo(() => {
        return totalGains - totalExpenses;
    }, [totalGains, totalExpenses]);


    const message = useMemo(() => {
        if (totalBalance < 0) {
            return {
                title: "Que triste!",
                description: "Neste mes, voce gastou mais do que deveria.",
                footerText: "Verifique seus gastos e tente cortar algumas coisas desnecessarias.",
                icon: sadImg
            }
        } else if (totalBalance == 0) {
            return {
                title: "Ufaa!",
                description: "Neste mes, voce gastou exatamente o que ganhou.",
                footerText: "Tenha cuidado. No proximo mes tente poupar o seu dinheiro.",
                icon: grinningImg
            }
        } else {
            return {
                title: "Muito bem!",
                description: "Sua carteira esta positiva!",
                footerText: "Continue assim. Considere investir seu saldo.",
                icon: happyImg
            }
        }
    },[totalBalance]);


    const relationExpensesVersusGains = useMemo(() => {
        const total = totalGains + totalExpenses;

        const percentGains = (totalGains / total) * 100;
        const percentExpenses = (totalExpenses / total) * 100;

        const data = [
            {
                name: "Entradas",
                value: totalExpenses,
                percent: Number(percentGains.toFixed(1)),
                color: '#E44C4E'
            },
            {
                name: "Saidas",
                value: totalExpenses,
                percent: Number(percentExpenses.toFixed(1)),
                color: '#F7931B'
            }
        ]

        return data;

    },[totalGains, totalExpenses]);


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

    
    return (
        <Container>

            <ContentHeader title="Dashboard" lineColor="#F7931b">
                <SelectInput 
                    options={months} 
                    onChange={(e) => handleMonthSelected(e.target.value)} 
                    defaultValue={monthSelected}></SelectInput>

                <SelectInput 
                    options={years} 
                    onChange={(e) => handleYearSelected(e.target.value)} 
                    defaultValue={yearSelected}></SelectInput>
            </ContentHeader>

            <Content>
                <WalletBox 
                    title='saldo'
                    amount={totalBalance}
                    footerLabel="atualizado com base nas entradas e saidas"
                    icon="dolar"
                    color='#4E41F0'></WalletBox>

                <WalletBox 
                    title='entradas'
                    amount={totalGains}
                    footerLabel="atualizado com baser nas entradas e saidas"
                    icon="arrowUp"
                    color='#F7931b'></WalletBox>

                <WalletBox 
                    title='saidas'
                    amount={totalExpenses}
                    footerLabel="atualizado com baser nas entradas e saidas"
                    icon="arrowDown"
                    color='#E44C4E'></WalletBox>

                <MessageBox
                    title={message.title}
                    description={message.description}
                    footerText={message.footerText}
                    icon={message.icon}></MessageBox>

                <PieChartBox data={relationExpensesVersusGains}></PieChartBox>

            </Content>

        </Container>
    );
}

export default Dashboard;