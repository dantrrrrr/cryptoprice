import axios from 'axios'
import { create } from 'zustand';
import { AxiosRequest } from '../axios/axios';
import Debounce from '../helpers/debounce'

const homeStore = create((set) => ({
    coins: [],
    trending: [],
    query: '',

    setQuery: (e) => {
        set({ query: e.target.value });
        homeStore.getState().searchCoin();
    },
    searchCoin: Debounce(async () => {
        const { query, trending } = homeStore.getState();
        if (query.length > 2) {

            const res = await AxiosRequest.get(`/search?query=${query}`);
            // console.log(res.data)
            const coins = res.data.coins.map(coin => {
                return {
                    name: coin.name,
                    image: coin.large,
                    id: coin.id,
                }
            })
            set({ coins })
        } else {
            set({ coins: trending })
        }

    }, 500),
    fetchCoins: async () => {
        const [res, btcRes] = await Promise.all([
            AxiosRequest.get("/search/trending"),
            AxiosRequest.get(`simple/price?ids=bitcoin&vs_currencies=usd`)
        ])
        const btcPrice = btcRes.data.bitcoin.usd;
        console.log(btcPrice)
        const coins = res.data.coins.map(coin => {
            return {
                id: coin.item.id,
                name: coin.item.name,
                image: coin.item.large,
                priceBtc: (coin.item.price_btc).toFixed(10),
                priceUsd: (coin.item.price_btc * btcPrice).toFixed(10),
            }
        })
        // console.log(res.data)
        set({ coins, trending: coins })
        console.log(coins)
    }
}))
export default homeStore;