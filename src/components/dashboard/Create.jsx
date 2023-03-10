import React  from 'react';
import {
    FiHome,
    FiBox,
    FiUser,
    FiFileText,
    FiFolder,
    FiMenu,
    FiTool,
    FiLayers,
    FiLogOut,
    FiInfo
  } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';


const Create = () => {
    const navigate = useNavigate()
    return (
        <div className='flex md:ml-[265px] justify-around text-white roboto mb-4 sha rounded-2xl py-4 bg-white animate-waving-hand mr-5 flex-col md:flex-row'>
            <div className='flex flex-col items-center justify-center p-5 bg-gradient-to-tl from-blue-400 to-blue-600 shadow-lg rounded-2xl mx-5 xl:w-[250px] cursor-pointer my-3 md:my-0'
            onClick={() => navigate('/invoices/create')}
            >
                <h2 className='mb-1 xl:text-[20px] text-center'>Faire une facture</h2>
                <FiFolder />
            </div>
            <div className='flex flex-col items-center justify-center p-5 bg-gradient-to-tl from-blue-400 to-blue-600 shadow-lg rounded-2xl mx-5 xl:w-[250px] cursor-pointer my-3 md:my-0'
             onClick={() => navigate('/quotes/create')}
            >
                <h2 className='mb-1 xl:text-[20px] text-center'>Faire un devis</h2>
                <FiFileText />
            </div>
            <div className='flex flex-col items-center justify-center p-5 bg-gradient-to-tl from-blue-400 to-blue-600 shadow-lg rounded-2xl mx-5 xl:w-[250px] cursor-pointer my-3 md:my-0'
             onClick={() => navigate('/customers')}
            >
                <h2 className='mb-1 xl:text-[20px] text-center'>Ajouter un client</h2>
                <FiUser />
            </div>
        </div>
    );
};

export default Create;