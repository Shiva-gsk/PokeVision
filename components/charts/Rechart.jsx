"use client"
import React, { PureComponent } from 'react';
import {
  Radar, RadarChart, PolarGrid, Legend,
  PolarAngleAxis, PolarRadiusAxis,
} from 'recharts';

const data = [
  { subject: 'HP', A: 120, B: 110, fullMark: 150, },
  { subject: 'Attack', A: 98, B: 130, fullMark: 150,},
  { subject: 'Defence', A: 86, B: 130, fullMark: 150,},
  { subject: 'Sp. Attack', A: 99, B: 100, fullMark: 150,},
  { subject: 'Sp. Defence', A: 85, B: 90, fullMark: 150, },
  { subject: 'Speed', A: 65, B: 85, fullMark: 150,},
];

export const Chart = () => {
  return(
    <div>

    </div>
  );
}

export default class RadarChartRecharts extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/dpgb3xjq/';

  render() {
    return (
      <div className='flex items-center justify-center h-screen'>

      <RadarChart cx={250} cy={250} outerRadius={150} width={500} height={500} data={this.props.stats}>
        <PolarGrid gridType='circle'/>
        <PolarAngleAxis dataKey="name" />
        <PolarRadiusAxis angle={30} domain={[0, 150]} />
        <Radar name="Stats" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        {/* <Radar name="Lily" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} /> */}
        <Legend />
      </RadarChart>
      </div>
    );
  }
}