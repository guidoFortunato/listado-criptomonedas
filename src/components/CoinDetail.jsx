import React from 'react'
import { useParams } from 'react-router-dom'
import DOMPurify from 'dompurify';
import {withRouter} from 'react-router-dom'


const CoinDetail = (props) => {

    const { id } = useParams()

    const [info, setInfo] = React.useState({})
    const [cargando, setCargando] = React.useState(false)

    React.useEffect(() => {

        const getData = async ()=>{   

            try {
                
                const data = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`)
                const res = await data.json()
                console.log(res)
                setInfo(res)
                setCargando(true)
                
                
            } catch (error) {
                // if (error === 'Could not find coin with the given id') {
                //     console.log('No existe ese id')
                // }
                console.log(error)
            }
            


        }
        getData()



    }, [id])

    const volver = ()=>{
        props.history.push('/')
    } 

    return cargando !== false  ? (
        <>
            {
                id === info.id ? (
                    
                    
                    <div className="container">
                        <div className="row">
                            
                            <div className="card mb-3 card-color">
                                <div className="row g-0">
                                    <div className="col-md-4">
                                    <img src={info.image.large} className="img-fluid rounded-start img-size" alt={info.name} />
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <h1 className="card-title text-black">Criptomoneda: {info.name}</h1>
                                            <h3 className="text-black">Symbol: {info.symbol}</h3>
                                            <h3 className="text-black">Price: ${info.market_data.current_price.usd}</h3><br />
                                            <p 
                                            className="card-text text-black"
                                            dangerouslySetInnerHTML={{__html:DOMPurify.sanitize(info.description.es)}}
                                            >                            
                                            </p><br />
                                            <button 
                                                onClick={()=>volver()} 
                                                className="btn btn-warning"
                                            >
                                                Volver
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                                
                        </div>

                    </div>




                ) : (<div>La criptomoneda {id} no existe</div>)
            }
        </>
    ) : (
        
            
                <div className='d-flex justify-content-center'>

                    <button className="btn btn-primary" type="button" disabled>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Cargando...
                    </button>
                </div>
            
       
    )
}

export default withRouter(CoinDetail)
