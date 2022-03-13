import React, { useEffect } from 'react'
import { ChartsContainer, StatsContainer } from '../../components'
import Loading from '../../components/Loading'
import { useAppContext } from '../../context/appContext'

export const Stats = () => {
  const {showStats, isLoading, monthlyApplications} = useAppContext()
  
  useEffect(() => {
    showStats()
    //eslint-disable-next-line
  }, [])

  if(isLoading){
    return <Loading center />
  }
  return (
    <>
   <StatsContainer />
   {monthlyApplications.toString().length > 0 && <ChartsContainer />}
   </>
  )
}
