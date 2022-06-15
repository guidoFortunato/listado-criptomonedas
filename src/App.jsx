import React from 'react';
//import CriptoCards from './components/CriptoCards';
import TableCoins from './components/TableCoins.jsx';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import CoinDetail from './components/CoinDetail.jsx';


function App() {

  const [coins, setCoins] = React.useState([])
  const [search, setSearch] = React.useState('')
    
    React.useEffect(() => {

        const getData = async ()=>{ 
            const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'  

            try {
                
                const data = await fetch(url)
                const res = await data.json()
                //console.log(res)
                setCoins(res)
                
                
            } catch (error) {
                console.log(error)
            }
            


        }
        getData()



    }, [])
  return (
    <Router>
      <Switch>
        <Route path='/' exact>
          <div className="container">
            <div className="row">
              <input 
                type="text" 
                placeholder='Search Coin'  
                className='form-control bg-dark text-light border-0 mt-4 text-center'
                onChange={e=>setSearch(e.target.value)}
                />
              <TableCoins coins={coins} search={search} />

            </div>
          </div>

        </Route>

      </Switch>
      <Switch>
        <Route path='/detail/:id' exact>
          <CoinDetail coins={coins}/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
