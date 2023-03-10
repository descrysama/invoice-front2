import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { FiPlusSquare, FiSearch } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getInvoicesByPages } from '../../app/stores/storeSlice';
import TableParser from '../../components/invoices/TableParser';

const Invoices = () => {
const [datas, setDatas] = useState({
    page:1,
    invoiceNumber:""
});
const [isReset, setIsReset] = useState(false);
const dispatch = useDispatch();
const invoices = useSelector(state => state.store)

    useEffect(() => {
        dispatch(getInvoicesByPages(datas))
    }, [isReset])

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getInvoicesByPages(datas))
    }
    const resetFilter = () => {
        setDatas({
            page:1,
            invoiceNumber:""
        })
        setIsReset(!isReset)
    }
    const paginationChange = (page) => {
        dispatch(getInvoicesByPages({...datas, page: page}))
          setDatas({...datas, page: page})
      }


    return (
        <div className='md:pl-[265px]'>
            <div className='flex items-center w-full flex-col md:flex-row xl:flex-row'>
               <form onSubmit={(e) => handleSubmit(e)} className="m-2">
                    <InputGroup minWidth={"280px"} maxWidth={"800px"} className="bg-white rounded-md">
                      <Input value={datas.invoiceNumber} onChange={(e) => setDatas({ ...datas, invoiceNumber: e.target.value})} placeholder='Recherchez N°facture' />
                      <InputRightElement children={<button type="submit" className="p-[5px] bg-[#59a3f7] w-full h-full rounded-r-md active:bg-[#59bdf779] hover:bg-[#2769a6] duration-300 flex justify-center items-center">
                        <FiSearch size={20} color={"white"}/>
                        </button>
                      } />
                    </InputGroup>
                  </form>
                  <div className='flex justify-center md:justify-between w-full mx-auto md:mx-0'>
                 {datas.invoiceNumber !== "" ? <button onClick={resetFilter} className="animate-waving-hand bg-[#59a3f7] text-white py-2 px-4 rounded">supprimer le filtre</button> : <div></div>}
                 <Link to="/invoices/create" className='md:mr-10'>
                <Button variant="" size='md' className="ml-4 bg-[#59e2f740] hover:bg-[#59bdf779]">
                <span className="text-[#59a3f7]">Créer un facture</span>
                <FiPlusSquare size={20} className="ml-2 text-[#59a3f7]"/>
                </Button>
            </Link>
            </div>
                 </div>
                 <div className="flex justify-center items-center">
            {Array.from({ length: invoices.total_pages }, (_, i) => (
                <Button key={i} onClick={() => paginationChange(i+1)} className="m-1" colorScheme='blue' variant={datas.page == i+1 ? 'solid' : 'outline'}>{i+1}</Button>
            ))}
        </div>
            <TableParser />
            <div className="flex justify-center items-center">
            {Array.from({ length: invoices.total_pages }, (_, i) => (
                <Button key={i} onClick={() => paginationChange(i+1)} className="m-1" colorScheme='blue' variant={datas.page == i+1 ? 'solid' : 'outline'}>{i+1}</Button>
            ))}
        </div>
        </div>
    );
};

export default Invoices;