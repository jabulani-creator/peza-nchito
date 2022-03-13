import React, { useState } from 'react'
import Wrapper from '../assets/wrappers/ChartsContainer'
import { useAppContext } from '../context/appContext'
import { AreaCharts } from './AreaCharts'
import { BarCharts } from './BarCharts'

export const ChartsContainer = () => {
    const [barChart, setBarChart] = useState(false)
    const {monthlyApplications: data} = useAppContext()
  return (
    <Wrapper>
        <h4>Monthly Applications</h4>
        <button type='button' onClick={() => setBarChart(!barChart)}>
         {barChart ? 'AreaChart' : 'BarChart'}
        </button>
        {barChart ? <BarCharts data={data}/> : <AreaCharts data={data} />}
    </Wrapper>
  )
}
