import { 
    Box,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
    StatGroup,
 } from '@chakra-ui/react';
 import CountUp from 'react-countup';

const StatCard = ({props}) => {
  return (
    <Stat className='p-7 m-4 rounded-xl overflow-hidden bg-white min-w-[250px] animate-waving-hand shadow-sm'>
        <StatLabel className='truncate'>{props.name}</StatLabel>
        <StatNumber fontSize={35}><CountUp  start={0} end={props.data} duration={0.5} /></StatNumber>

        <div className='absolute -right-[100px] top-0 bg-[#59a3f7a1] w-[200px] h-[135px] opacity-30 rounded-full justify-start'>
        </div>
        <div className='absolute right-7 top-1/2 -translate-y-1/2 text-[#4355f7] text-[30px]'>
         {props.icon}
        </div>
    </Stat>
  )
}

export default StatCard