import { createSlice, createAsyncThunk, combineSlices } from "@reduxjs/toolkit";
import { candlesDataPreparation } from "../dataProcessing";
import DataPoint from "../../interfaces/DataPoint";

export const fetchCandles = createAsyncThunk(
  'candles/fetchCandles',
  async ({ symbol, interval, limit }: { symbol: string; interval: string; limit: number }, {rejectWithValue}) => {
    try{
        const url = `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`
        const response = await fetch(url);
        const data = await response.json();
        return candlesDataPreparation(data);
    } catch (err){
        console.log(`Error: ${err}`);
        return rejectWithValue('Failed');
    }
  }
);


interface ICandlesState {
	candles: DataPoint[]
	status: 'loading' | 'loaded' | 'error'
}

const initialState: ICandlesState = {
    candles: [],
    status: 'loading',
};

const candlesSlice = createSlice({
    name: 'candles',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder
            .addCase(fetchCandles.pending, (state) => {
                state.status = 'loading';
                state.candles = [];
            })
            .addCase(fetchCandles.fulfilled, (state, action) => {
                state.status = 'loaded';
                state.candles = action.payload;
            })
            .addCase(fetchCandles.rejected, (state, action) => {
                state.status = 'error';
                state.candles = [];
            });
    },
});

export const candlesReducer = candlesSlice.reducer;