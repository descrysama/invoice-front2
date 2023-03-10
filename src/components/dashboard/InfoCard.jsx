import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {FiPhone, FiMail, FiHome, FiUser, FiAtSign} from 'react-icons/fi';
import {Avatar} from '@chakra-ui/react'
import Moment from 'react-moment';
import { NavLink } from 'react-router-dom';
import { Tag } from '@chakra-ui/react'

const InfoCard = () => {

    const [store, setStore] = useState()
    const auth = useSelector(state => state.store);


    useEffect(() => {
            setStore(auth)
    }, [])

    return (
        
        <div className='flex rounded-2xl flex-col bg-white roboto xl:w-[900px] md:w-full mt-4 xl:mt-0 p-4 items-center mx-auto md:mx-0 xl:mx-0 shadow-sm animate-waving-hand'>
            <Avatar size='2xl' name='Dan Abrahmov' src={process.env.REACT_APP_API_URL + "/images/" + auth.store.profilePicture} />
            <div className='flex'>
               <div className='flex flex-col'>
                  <div className='flex items-center my-2 self-start'>
                     <FiAtSign /> 
                     <p className='ml-2'><Tag  colorScheme='linkedin' size={"lg"}>{auth.store.name}</Tag></p> 
                  </div>
                  <div className='flex items-center my-2 self-start'>
                     <FiPhone /> 
                     <p className='ml-2'><Tag  colorScheme='linkedin' size={"lg"}>{auth.store.tel}</Tag></p> 
                  </div>
                  <div className='flex items-center my-2 self-start'>
                     <FiMail /> 
                     <p className='ml-2'><Tag  colorScheme='linkedin' size={"lg"}>{auth.store.email}</Tag></p> 
                  </div>
               </div>
            <div className='flex flex-col'>          
            <div className='flex items-center my-2 self-start'>
               <FiHome /> 
               <p className='ml-2'><Tag  colorScheme='linkedin' size={"lg"}>{auth.store.address}</Tag></p> 
            </div>

            <div className='flex items-center my-2 self-start'>
               <FiUser /> 
               <p className='ml-2'><Tag  colorScheme='linkedin' size={"lg"}><Moment format="DD MMMM YYYY" locale="fr">{auth.store.createdAt}</Moment></Tag></p> 
            </div>
            </div>
              </div>
            <NavLink to='/profile' className="ml-4 my-5 text-[20px] bg-gradient-to-tl from-blue-400 to-blue-600 text-white px-4 py-1 rounded">Modifier</NavLink>
        </div>
    );
};

export default InfoCard;