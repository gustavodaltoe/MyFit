import React, { useEffect, useState } from 'react';
import { format, subDays } from 'date-fns';
import { eachDayOfInterval, isToday } from 'date-fns/esm';
import { pt } from 'date-fns/esm/locale';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import dailyFoodService from '../../services/dailyFoodService';

import './styles.scss';
import { useAuth } from '../../context/AuthContext';
import DailyFoodDto from '../../dtos/DailyFoodDto';

interface ChartData {
  name: string;
  carbo: number;
  protein: number;
  fat: number;
  calories: number;
}

interface IProps {
  todayDailyFoods?: DailyFoodDto[];
}

const CaloriesChart: React.FC<IProps> = ({ todayDailyFoods }) => {
  const { user } = useAuth();
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    const today = new Date();
    const lastWeek = subDays(today, 6);
    const weekInterval = eachDayOfInterval({ start: lastWeek, end: today });

    const daySummariesPromises = weekInterval.map((day) => {
      return dailyFoodService.list(day).then((dailyFoods) => {
        const weekDay = isToday(day)
          ? 'hoje'
          : format(day, 'eeee', { locale: pt }).split('-')[0];

        const daySummary: ChartData = {
          name: weekDay,
          carbo: 0,
          protein: 0,
          fat: 0,
          calories: 0,
        };

        dailyFoods.forEach((dailyFood) => {
          const { amount } = dailyFood;
          const { calories, carbo, protein, fat } = dailyFood.food;

          daySummary.calories += Number((calories * amount).toFixed(1));
          daySummary.carbo += Number((carbo * amount).toFixed(1));
          daySummary.protein += Number((protein * amount).toFixed(1));
          daySummary.fat += Number((fat * amount).toFixed(1));
        });

        return daySummary;
      });
    });

    Promise.all(daySummariesPromises).then((summaries) =>
      setChartData(summaries),
    );
  }, [todayDailyFoods]);

  // useEffect(() => {
  //   let seconds = 0;
  //   const interval = setInterval(() => {
  //     setSeconds(seconds => seconds + 1);
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <>
      <div className="calories-chart">
        <ResponsiveContainer>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="carbo" stackId="a" fill="#922B2B" />
            <Bar dataKey="protein" stackId="a" fill="#505DCB" />
            <Bar dataKey="fat" stackId="a" fill="#B09F44" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="calories-chart">
        <ResponsiveContainer>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <ReferenceLine
              y={user.necessities?.calories}
              stroke="red"
              alwaysShow
            />
            <Bar dataKey="calories" fill="#505DCB" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default CaloriesChart;
