import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { candlesDataPreparation } from '../dataProcessing';
import DataPoint from '../../interfaces/DataPoint';
import axios from '../../axios';
import IRawData from '../../interfaces/IRawData';

export const fetchCandles = createAsyncThunk(
    'candles/fetchCandles',
    async (
        { symbol, interval, limit }: { symbol: string; interval: string; limit: number },
        { rejectWithValue },
    ) => {
        try {
            const url = `/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`;
            const { data } = await axios.get<IRawData[]>(url);
            return candlesDataPreparation(data);
        } catch (err) {
            console.log(`Error: ${err}`);
            return rejectWithValue('Failed');
        }
    },
);

interface ICandlesState {
    candles: DataPoint[];
    status: 'loading' | 'loaded' | 'error';
}

const initialState: ICandlesState = {
    candles: [],
    status: 'loading',
};

const candlesSlice = createSlice({
    name: 'candles',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCandles.pending, (state) => {
                state.status = 'loading';
                // state.candles = [];
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
