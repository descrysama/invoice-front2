import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
    Input,
    Button,
    Modal,
    ModalCloseButton,
    FormControl,
    FormLabel,
    useDisclosure,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Avatar,
    Divider,
} from '@chakra-ui/react'
import { updateStore } from '../../app/stores/storeSlice';
import { ToastContainer, toast } from 'react-toastify';

const Profil = () => {
    const auth = useSelector(state => state.store);
    const [payload, setPayload] = useState({
        newpassword: "",
        oldpassword:"",
        id: "",
        name: "",
        email: "",
        tel: "",
        address: "",
        tva_number: "",
        image:""
    })

    const dispatch = useDispatch();

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(updateStore(payload)).then((res) => {
            if(res.payload.error) {
                toast.error(res.payload.error)
            } else {
                toast.success("Profil mis à jour avec succès.")
            }
        })
      
    }

    useEffect(() => {
        setPayload({...payload,
            id: auth.store._id,
            name: auth.store.name,
            email: auth.store.email,
            tel: auth.store.tel,
            address: auth.store.address,
            tva_number: auth.store.tvaNumber
        })
    }, [])
    return (
        <div className='md:ml-[265px] h-auto flex flex-col items-center'>
             <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
    />
              <h2 className='font-bold text-xl md:my-5 m-2 text-center md:text-left self-start'>Profil</h2>
              <Avatar size='2xl' name='Dan Abrahmov' src={process.env.REACT_APP_API_URL + "/images/" + auth.store.profilePicture} />
                <form action="" className='h-auto flex md:items-start items-center flex-col md:w-[70%]' onSubmit={(e) => onSubmit(e)}> 
                    <div className='flex md:flex-row flex-col'>
                        <div className='m-2 md:w-1/2'>
                            <div className='max-w-[350px] mb-4'>
                                <label htmlFor="name" className='roboto text-[16px] m-1'>Nom de boutique</label>
                                <Input background={'white'} type="text" name="name" id="name" value={payload.name} onChange={(e) => setPayload({...payload, name: e.target.value })}/>
                            </div>
                            <div className='max-w-[350px] mb-4'>
                                <label htmlFor="email" className='roboto text-[16px] m-1'>Email</label>
                                <Input background={'white'} type="email" name="email" id="email" value={payload.email} onChange={(e) => setPayload({...payload, email: e.target.value })}/>
                            </div>
                            <div className='max-w-[350px] mb-4'>
                                <label htmlFor="newpassword" className='roboto text-[16px] m-1'>Nouveau mot de passe</label>
                                <Input background={'white'} type="password" name="newpassword" id="newpassword" value={payload.newpassword} onChange={(e) => setPayload({...payload, newpassword: e.target.value })}/>
                            </div>
                        </div>
                        <div className='m-2 md:w-1/2'>
                            <div className='max-w-[350px] mb-4'>
                                <label htmlFor="tel" className='roboto text-[16px] m-1'>Téléphone</label>
                                <Input background={'white'} type="tel" name="tel" id="tel" value={payload.tel} onChange={(e) => setPayload({...payload, tel: e.target.value })} />
                            </div>
                            <div className='max-w-[350px] mb-4'>
                                <label htmlFor="address" className='roboto text-[16px] m-1'>Adresse</label>
                                <Input background={'white'} type="text" name="address" id="address" value={payload.address} onChange={(e) => setPayload({...payload, address: e.target.value })}/>
                            </div>
                            <div className='max-w-[350px] mb-4'>
                                <label htmlFor="profilePicture" className='roboto text-[16px] m-1'>Image de boutique</label>
                                <Input background={'white'} type="file" name="profilePicture" id="profilePicture" value={payload.profilePicture} onChange={(e) => setPayload({...payload, image: e.target.files[0] })}/>
                            </div>
                            <div className='max-w-[350px] mb-4'>
                                <label htmlFor="address" className='roboto text-[16px] m-1'>Numero de TVA</label>
                                <Input background={'white'} type="text" name="address" id="address" value={payload.tva_number} onChange={(e) => setPayload({...payload, tva_number: e.target.value })}/>
                            </div>
                        </div>
                    </div>
                    <div className='p-2 md:block flex flex-col items-center justify-center'>
                        <Divider />
                        <h2 className='text-l my-5 text-center'>Pour valider les changements, entrez votre mot de passe actuel :</h2>
                        <div className='w-[80%]'>
                            <label htmlFor="oldpassword">Mot de passe<span className='text-[#ff0000]'>*</span></label>
                            <Input required background={'white'} type="password" name="oldpassword" id="oldpassword" value={payload.oldpassword} onChange={(e) => setPayload({...payload, oldpassword: e.target.value })}/>
                        </div>
                        <Button type='submit' colorScheme='messenger' className='mt-4' >Enregistrer</Button>
                    </div>
                </form>
        </div>
    );
};

export default Profil;