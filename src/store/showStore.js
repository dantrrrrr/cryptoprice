import { create } from "zustand";
import { AxiosRequest } from "../axios/axios";

const showStore = create((set) => ({
    graphData: [],
    data: [],
    reset:()=>{
        set({graphData:[],data:null})
    },
    fetchData: async (id) => {

        const [graphRes, dataRes] = await Promise.all([
            AxiosRequest.get(`/coins/${id}/market_chart?vs_currency=usd&days=30`),
            AxiosRequest.get(`/coins/${id}?localization=false&market_data=true`)

        ])

        const graphData = graphRes.data.prices.map(price => {
            const [timeStamp, p] = price;
            const date = new Date(timeStamp).toLocaleDateString();

            return {

                Date: date,
                Price: p
                

            }
        })
        set({ graphData, data: dataRes.data })
    }
}))
export default showStore; 