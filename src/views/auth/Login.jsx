import {
  Box,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Stack,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from "../../app/stores/storeSlice";
import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from 'react';

export const Login = () => {
  const dispatch = useDispatch();
  const store = useSelector(state => state.store);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)
  const imageWidth = 70

  const onSubmit = (e) => {
      e.preventDefault();
      dispatch(login({email, password}))
  }
  function hover(element) {
    element.currentTarget.setAttribute('src',  element.currentTarget.id + '-1.png');
  }
  function unhover(element) {
    element.currentTarget.setAttribute('src', element.currentTarget.id + ".png");
  }

  useEffect(() =>{
    toast.error(store.error)
  }, [store.error])

  return (
 
    <div className='w-full h-screen flex rounded'>
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
      <div className='h-full hidden md:block md:w-2/3 bg-gradient-to-r from-blue-500 to-blue-600 relative'>
        <div className='absolute top-1/4 xl:ml-20 md:ml-10'>

        <p className='md:text-[25px] xl:text-[35px] w-2/3 roboto text-white font-medium animate-waving-hand'>Gérez vos factures numériques très facilement grâce à nos solutions !</p>
        <p className='md:text-[15px] xl:text-[20px]  w-2/3 roboto text-white mt-5 font-medium animate-waving-hand'>Commencez dès maintenant !</p>
        </div>
        <img src={process.env.PUBLIC_URL + "Online_payment_Flatline.svg"} alt="" className='absolute md:-right-[140px] top-1/2 -translate-y-1/2 md:display-block' width={420} />
        <div className='absolute top-2/3 md:right-20 xl:right-1/3'>
        <div className='flex'>
          <a href="https://www.snapchat.com/add/your-elife" target="_blank"><img src={process.env.PUBLIC_URL + "Snapchat.png"} className="hover:cursor-pointer" id="Snapchat" alt="" width={imageWidth} onMouseOver={(e) => hover(e)} onMouseOut={(e) => unhover(e)}/></a>
          <a href="https://www.instagram.com/your_elife" target="_blank"><img src={process.env.PUBLIC_URL + "Instagram.png"} className="hover:cursor-pointer" id="Instagram" alt="" width={imageWidth} onMouseOver={(e) => hover(e)} onMouseOut={(e) => unhover(e)}/></a>
          {/* <img src={process.env.PUBLIC_URL + "Facebook.png"} className="hover:cursor-pointer" id="Facebook" alt="" width={imageWidth} onMouseOver={(e) => hover(e)} onMouseOut={(e) => unhover(e)}/> */}
          {/* <img src={process.env.PUBLIC_URL + "Whatsapp.png"} className="hover:cursor-pointer" id="Whatsapp" alt="" width={imageWidth} onMouseOver={(e) => hover(e)} onMouseOut={(e) => unhover(e)}/> */}
        </div>
        </div>
      </div>
      <div className='w-full h-full bg-white flex flex-col items-center justify-center md:pb-[200px] pb-[100px]'>
      <h1 className='md:text-[50px] text-[40px] mb-10 roboto font-semibold w-2/3 text-center animate-waving-hand'>Bienvenue sur votre service de <span className='text-[#2563eb]'>facturation</span></h1>
        <form onSubmit={(e) => onSubmit(e)} className="flex flex-col sm:w-[60%] w-full sm:p-0 p-3 animate-waving-hand">
          <div className='flex flex-col'>
            <label htmlFor="email" className='font-semibold'>Email</label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} id="email" type="email" />
          </div>
          <div className='flex flex-col'>
            <label htmlFor="password" className='font-semibold'>Mot de passe</label>
          
            <InputGroup size='md'>
            <Input value={password}  type={show ? 'text' : 'password'} onChange={(e) => setPassword(e.target.value)} id="password" />
      <InputRightElement width='4.5rem'>
        <Button h='1.75rem' size='sm' onClick={handleClick}>
          {show ? 'Cacher' : 'Voir'}
        </Button>
      </InputRightElement>
    </InputGroup>
            <p>Mot de passe oublié ? <a href="#"><span className="text-blue-500">Cliquez ici</span></a></p>
          </div>
              <input type="submit" value="Connexion" className='hover:cursor-pointer hover:bg-blue-400 bg-blue-500 p-2  text-white rounded-xl mt-3'/>
        </form>
        </div>
    </div>
    
  )
}