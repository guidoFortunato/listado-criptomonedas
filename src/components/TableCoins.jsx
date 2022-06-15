import React from 'react'
//import CoinRow from './CoinRow'
import {Link} from 'react-router-dom'

const titles = ['#', 'Coin', 'Detail','Price', 'Price Change']


const TableCoins = ({coins, search}) => {


    

    const filteredCoins = coins.filter((coin)=> coin.name.toLowerCase().includes(search.toLowerCase()) || coin.symbol.toLowerCase().includes(search.toLowerCase()))
    
    return (
        <table className='table table-dark mt-4 table-hover'>
            <thead>
                <tr>
                    {
                        titles.map((title,index) =>(
                            <td key={index}>{title}</td>
                        ))
                    }
                </tr>
            </thead>
            <tbody>
                {
                    filteredCoins.map( (coin,index) =>(
                        <tr key={index+1}>
                            <td>{index+1}</td>
                        

                            <td>
                                <img src={coin.image} alt={coin.name} className='img-fluid me-4 w-l img-responsive'/>
                                <span>
                                {coin.name}
                                </span>
                                <span className='ms-3 text-muted text-uppercase'>{coin.symbol}</span>
                            </td>
                            <td>
                            <button 
                                className='btn btn-warning btn-sm'
                                >
                                   
                                        <Link to={`/detail/${coin.id}`} className='text-decoration-none text-black'>
                                            ver detalle
                                        </Link>
                                    
                                </button>
                            </td>
                            
                            <td>${coin.current_price}</td>
                            <td className={coin.price_change_percentage_24h > 0 ? 'text-success' : 'text-danger'}>
                                {Math.round((coin.price_change_percentage_24h + Number.EPSILON) * 100) / 100}%
                            </td>
                            
            
                        </tr>
                    ) )
                }
            </tbody>
        </table>
    )
}

export default TableCoins
