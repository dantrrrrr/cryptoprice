import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import showStore from '../store/showStore'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Header from '../components/Header';


export default function Show() {
  const store = showStore();
 console.log(store.data)
  const { id } = useParams();
  useEffect(() => {
    store.fetchData(id);
    return () => {
      store.reset();
    }
  }, [])


  return (
    <div>
      <Header />

      {store.data && <>
      <img src={store.data.image.large} alt="" />
        <h1>{store.data.name}</h1>
        <AreaChart
          width={500}
          height={400}
          data={store.graphData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Date" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="Price" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
        <div>
          <h4>Market cap rank</h4>
          <span>{store.data.market_cap_rank}</span>
          <h4>24h high</h4>
          <span>{store.data.market_data?.high_24h.usd}</span>
          <h4>24h low</h4>
          <span>{store.data.market_data?.low_24h.usd}</span>
          <h4>circulating supply</h4>
          <span>{store.data.market_data?.circulating_supply}</span>
          <h4>1y change </h4>
          <span>{store.data.market_data?.price_change_percentage_1y.toFixed(2)}%</span>
        </div>
      </>
      }
    </div>
  )
}

