import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import IPriceData from "../../interfaces/IPriceData";
import { priceDataProcessed} from "../dataProcessing";
// import { currency, coins } from "../../CoinSettings";

export const fetchPrices = createAsyncThunk(
  'prices/fetchCandles',
  async ({currency, coins}: {currency: string, coins: string[][]}, {rejectWithValue}) => {
    try{
        const url = 'https://api.binance.com/api/v3/ticker/price';
        const response = await fetch(url);
        const data = await response.json();
        return priceDataProcessed(data, currency, coins);
    } catch (err){
        console.log(`Error: ${err}`);
        return rejectWithValue('Failed');
    }
  }
);


interface IPricesState {
	prices: IPriceData[]
	status: 'loading' | 'loaded' | 'error'
}

const initialState: IPricesState = {
    prices: [],
    status: 'loading',
};

const pricesSlice = createSlice({
    name: 'prices',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPrices.pending, (state) => {
                state.status = 'loading';
                state.prices = [];
            })
            .addCase(fetchPrices.fulfilled, (state, action) => {
                state.status = 'loaded';
                state.prices = action.payload;
            })
            .addCase(fetchPrices.rejected, (state)=>{
                state.status = 'error';
                state.prices = [];
            });
    },
});

export const pricesReducer = pricesSlice.reducer;
