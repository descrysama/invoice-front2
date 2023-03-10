import React from 'react';

import {
    FiTrendingUp,
    FiUsers,
    FiFile
  } from 'react-icons/fi';
import { Box, Spinner } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import StatCard from '../../components/dashboard/StatCard';
import { useEffect, useState } from 'react';
import { store } from '../../app/store';
import { checkAuth, getInvoicesByHour, getInvoicesByMonth, getInvoicesByWeek, getProductMostSold, getRepairMostSold } from '../../app/stores/storeSlice';
import InfoCard from '../../components/dashboard/InfoCard';
import BestSeller from '../../components/dashboard/BestSeller';
import BestRepair from '../../components/dashboard/BestRepair';
import InvoiceChart from '../../components/dashboard/InvoiceChart';
import Create from '../../components/dashboard/Create';


const Home = () => {
    const auth = useSelector(state => state.store);
    const [errorProduct, setErrorProduct] = useState()
    const [errorInvoice, setErrorInvoice] = useState()
    const [errorRepair, setErrorRepair] = useState()
    const [format, setFormat] = useState("week")
    const [loader, setLoader] = useState(true)
    const dispatch = useDispatch();

    const statCards = [
        {name: "Total factures", icon: <FiTrendingUp />, data: auth.store.totalInvoice},
        {name: "Total clients", icon: <FiUsers />, data: auth.store.totalCustomer},
        {name: "Total devis", icon: <FiFile />, data: auth.store.totalQuote}
    ];
   
    useEffect(() => {
      async function fetchData(){
        store.dispatch(checkAuth());
        await dispatch(getProductMostSold()).then((res) => setErrorProduct(res.payload.error))
        await dispatch(getRepairMostSold()).then((res) => setErrorRepair(res.payload.error))
        await dispatch(getInvoicesByMonth()).then((res) => setErrorInvoice(res.payload.error))
        await dispatch(getInvoicesByWeek()).then((res) => setErrorInvoice(res.payload.error))
        await dispatch(getInvoicesByHour()).then((res) => setErrorInvoice(res.payload.error))

        setLoader(false)
      }
      fetchData()
    }, [])

    if(loader){
      return <div className='flex justify-center items-center h-screen'><Spinner
      thickness='4px'
      speed='0.65s'
      emptyColor='gray.200'
      color='blue.500'
      size='xl'
     
    /></div>
    }
 
  return (
    <div>
        <h2 className='md:ml-[265px] font-bold text-xl md:my-5 text-center md:text-left'>Dashboard</h2> 
    <Box
    className='md:pl-[239px] w-full flex justify-center items-center'
    >
        <div className='w-full flex flex-wrap md:m-2 justify-center'>
            {statCards.map((stat, key) => (
              <StatCard key={key} props={stat}/>
              ))}
        </div>
    </Box>
    <Create />
    <div className='xl:flex md:ml-[265px] mr-5 animate-waving-hand xl:justify-around'>
    <div className='bg-white rounded-2xl w-full mr-3 format-input py-4 pl-2'>
    <h2 className='font-bold roboto text-xl ml-2 mb-4 text-center md:text-left'>Statistiques - Factures</h2>
      <input type="radio" name="format" id="jour" value="day" onClick={(e) => setFormat("hour")}/>
      <label htmlFor="jour">Aujourd'hui</label>
      <input type="radio" name="format" id="semaine" value="week" defaultChecked={true} onClick={(e) => setFormat("week")}/>
      <label htmlFor="semaine">Semaine</label>
      <input type="radio" name="format" id="mois"  value="month" onClick={(e) => setFormat("month")}/>
      <label htmlFor="mois">Mois</label>
    { auth.getInvoicesByMonth !== null || auth.getInvoicesByWeek !== null || auth.getInvoicesByHour ? <InvoiceChart format={format}/>: null}
    </div>
    <InfoCard />
    </div>
    <div className='xl:flex md:ml-[265px] mr-5 animate-waving-hand mb-3'>
      <div className='basis-full xl:mr-3'>
      <BestRepair error={errorRepair}/>
      </div>
      <div className='basis-full'>
      <BestSeller error={errorProduct}/>
      </div>
    </div>
    </div>
  )
}

export default Home