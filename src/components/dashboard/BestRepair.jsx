import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRepairMostSold } from '../../app/stores/storeSlice';
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Tag
  } from '@chakra-ui/react'
const BestRepair = ({error}) => {

    const auth = useSelector(state => state.store)
    return (
        <div className='mt-4 shadow-sm w-full'>
            {error !== undefined ? (
            <div className='bg-white rounded-xl p-5 text-center shadow-md dosis h-[380px]'>
                <span>{error}</span> 
                <img src={process.env.PUBLIC_URL + "no-data.svg"} alt="" width={300} className="mx-auto"/>
            </div>
                ) : 
            (
                
                <TableContainer className="bg-white rounded-2xl h-[380px] p-4">
                    <Tag  colorScheme='linkedin' className='my-4 ml-6 dosis dosis-700'>Best Seller Réparations</Tag>    
                <Table variant='simple'>
                <Thead className='bg-gray-100 px-4'>
                    <Tr>
                        <Th className='rounded-l-xl'>Nom de la réparation</Th>
                        <Th>prix</Th>
                        <Th isNumeric className='rounded-r-xl'>quantité vendu</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                        { auth.repairsMostSold &&
                           auth.repairsMostSold.map((repair) => {
                                return <Tr className='dosis' key={repair._id}>
                                <Td>{repair.repair}</Td>
                                <Td>{repair.price.toFixed(2)} €</Td>
                                <Td isNumeric>{repair.totalQuantity}</Td>
                            </Tr>
                               
})
                        }
                    </Tbody>
                    <Tfoot>
                  
                    </Tfoot>
                </Table>
                </TableContainer>

            )}
           
        </div>
    );
};

export default BestRepair;