import { createSlice, createAsyncThunk, combineSlices } from "@reduxjs/toolkit";
import { candlesDataPreparation } from "../dataProcessing";
import DataPoint from "../../interfaces/DataPoint";
import axios from "axios";

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


interface CandlesState {
	candles: DataPoint[]
	status: 'loading' | 'loaded' | 'error'
}

const initialState: CandlesState = {
    candles: [],
    status: 'loading',
};

const candlesSlice = createSlice({
    name: 'slices',
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