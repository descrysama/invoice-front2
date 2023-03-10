import React, { useEffect, forwardRef } from 'react'
import { useSelector } from 'react-redux'

const TicketTemplate = forwardRef(({props}, ref) => {

    const auth = useSelector(state => state.store);
    useEffect(() => {
        console.log(props)
    }, [])
    
      return (
        <div ref={ref} className="flex flex-col items-start max-w-[300px] h-auto">
                <img src={process.env.REACT_APP_API_URL + "/images/" + auth.store.profilePicture} alt="Logo" className='max-w-[120px]'/>
                <div className='flex flex-col justify-start w-full ml-1'>
                    <label className='text-left text-[12px]'>Numero du devis :</label>
                    <p className='text-[10px]'>{props.quote._id}</p>
                </div>
                <div className='flex flex-col justify-start w-full ml-1'>
                    <label className='text-left text-[12px]'>Client :</label>
                    <p className='text-[10px]'>{props.quote.customer.firstname} {props.quote.customer.lastname}</p>
                </div>
                <table className='w-full'>
                    <thead>
                        <tr className='border-b-2 border-black'>
                            <th className="quantity">Qty</th>
                            <th className="description">Article</th>
                            <th className="price">Prix</th>
                        </tr>
                    </thead>
                    <tbody className='w-full'>
                        {props.quote.repairsObjects.map((repair, key) => (
                            <tr key={key} className='border-b-[1px] border-black text-[14px]'>
                                <td className='text-center'>{props.quote.repairs[key].qty}</td>
                                <td className="text-center max-w-[90px] truncate overflow-hidden">{repair.libelle}</td>
                                <td className="text-right">{repair.price} €</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <p className='w-full text-right text-[14px]'>TVA {props.quote.tva} %</p>
                <p className='w-full text-right text-[14px]'>Total : {props.quote.total} €</p>
                <p className='w-full text-right text-[12px] mt-2'>Conservez ce ticket afin de recupérer votre appareil une fois prêt.</p>
        </div>
      )
    })

export default TicketTemplate