import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import homeStore from '../store/homeStore'


function Home() {
  const store = homeStore();
  console.log(store.coins)
  useEffect(() => {
    store.trending.length === 0 && store.fetchCoins()
  }, [])
  return (
    <div>
      <Header />
      <input type="text" value={store.query} onChange={store.setQuery} />
      {store.coins.map(coin => {
        return (
          <div className="" ket={coin.id}>
            <img src={coin.image} alt="" />
            <h1><Link to={`/${coin.id}`}>
              {coin.name}
            </Link>
            </h1>
            <div>
              <h3>price btc</h3>
              <span>{coin.priceBtc}</span>
            </div>
            <div>
              <h3>price usd</h3>
              <span>{coin.priceUsd}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Home