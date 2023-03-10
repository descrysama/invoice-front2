import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import {
    Box,
    InputRightElement,
    Button,
    InputGroup,
    Input, 
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    useDisclosure,
} from "@chakra-ui/react";
import { FiSearch, FiPlusSquare } from "react-icons/fi";
import TableParser from "../../components/categories/tableParser";
import { useEffect, useRef, useState } from "react";
import { addCategory, fetchCategories, searchCategories } from "../../app/categories/categoryActions";

const Categories = () => {
    
    const dispatch = useDispatch();
    const [query, setQuery] = useState("");

    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = useRef(null)
    const finalRef = useRef(null)

    const [libelle, setLibelle] = useState("");
    
    const onSubmit = (e) => {
        e.preventDefault();
        onClose();
        if(libelle) {
            dispatch(addCategory(libelle)).then((res) => {
              if(res.payload.error) {
                if(res.payload.error.code == 11000) {
                  toast.error("Cette catégorie existe déjà");
                }
              }
            });
            setLibelle()
        } else {
            toast.error("Veuillez remplir tout les champs")
        }
    }

    const toggleSearch = (e) => {
        e.preventDefault();
        if(query) {
            dispatch(searchCategories(query ? query : null))
        } else {
            dispatch(fetchCategories());
        }
    }

    const removeFilter = () => {
      dispatch(fetchCategories());
      setQuery("")
    }

    useEffect(() => {
        dispatch(fetchCategories());
    }, [])


  return (
    <Box className='md:pl-[239px] w-full flex flex-col justify-center items-center p-4'>
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
        <div className="w-[95%]  flex flex-wrap m-2 sm:justify-between justify-center items-center">
            <div className="flex md:flex-row flex-wrap sm:flex-nowrap justify-center sm:justify-start">
            <div className="w-full flex justify-center items-center">

                  <form onSubmit={(e) => toggleSearch(e)} className="m-2">
                    <InputGroup minWidth={"280px"} maxWidth={"800px"} className="bg-white rounded-md">
                      <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder='Recherchez vos catégories' />
                      <InputRightElement children={<button type="submit" className="p-[5px] bg-[#59a3f7] w-full h-full rounded-r-md active:bg-[#59bdf779] hover:bg-[#2769a6] duration-300 flex justify-center items-center">

                        <FiSearch size={20} color={"white"}/>
                        </button>
                      } />
                    </InputGroup>
                  </form>
                  {query != "" ? <button  onClick={() => removeFilter()} className="animate-waving-hand bg-[#59a3f7] text-white py-2 px-4 rounded">supprimer le filtre</button> : null}
                </div>
            </div>
            <Button variant="" onClick={onOpen} size='md' className="ml-4 bg-[#59e2f740] hover:bg-[#59bdf779]">
              <span className="text-[#59a3f7]">Ajouter une catégorie</span>
              <FiPlusSquare size={20} className="ml-2 text-[#59a3f7]"/>
            </Button>
        </div>
        <TableParser/>

        <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Ajouter un produit :</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={(e) => onSubmit(e)}>
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Nom :</FormLabel>
                <Input required ref={initialRef} placeholder='Téléphonie' value={libelle} onChange={(e) => setLibelle(e.target.value)}/>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button type="submit" colorScheme='blue' mr={3}>
                Créer
              </Button>
              <Button onClick={onClose}>Annuler</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Box>
    
  )
}

export default Categories