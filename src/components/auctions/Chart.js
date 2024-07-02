import React, { useState, useEffect, useContext } from 'react';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { getFirestore, collection, query, where, onSnapshot } from 'firebase/firestore';
import { AuthContext } from '../../context/AuthContext'; 

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const firestore = getFirestore();

const Chart = () => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{
            label: 'Current Prices',
            data: [],
            backgroundColor: [],
            borderColor: [],
            borderWidth: 1
        }]
    });

    const { currentUser } = useContext(AuthContext); 

    useEffect(() => {
        const fetchData = async () => {
            const q = query(collection(firestore, 'auctions'), where('email', '==', currentUser?.email));
            onSnapshot(q, (snapshot) => {
                const data = snapshot.docs.map(doc => doc.data());
                console.log("Filtered user data:", data); 
                processChartData(data);
            });
        };

        const processChartData = (data) => {
            const titles = data.map(item => item.title);
            const curPrices = data.map(item => item.curPrice);

            setChartData({
                labels: titles,
                datasets: [{
                    label: 'Current Prices',
                    data: curPrices,
                    backgroundColor: titles.map((_, index) => {
                        const colors = [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ];
                        return colors[index % colors.length];
                    }),
                    borderColor: titles.map((_, index) => {
                        const borderColors = [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ];
                        return borderColors[index % borderColors.length];
                    }),
                    borderWidth: 1
                }]
            });
        };

        if (currentUser) {
            fetchData();
        }
    }, [currentUser]);

    const options = {
        maintainAspectRatio: false,
        scales: {},
        plugins: {
            legend: {
                labels: {
                    fontSize: 25,
                },
            },
        },
    };

    return (
        <div>
            <Bar
                data={chartData}
                height={400}
                options={options}
            />
        </div>
    );
};

export default Chart;
