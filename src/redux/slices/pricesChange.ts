import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import IHistoryData from '../../interfaces/IHistoryData';
import { processedHistoryData } from '../dataProcessing';
import axios from '../../axios';
import IRawData from '../../interfaces/IRawData';

export const fetchPriceChange = createAsyncThunk(
    'price-history/fetchPriceChange',
    async ({ symbol }: { symbol: string }, { rejectWithValue }) => {
        try {
            const url = `/klines?symbol=${symbol}&interval=1d&limit=50`;
            const { data } = await axios.get<IRawData[]>(url);
            return processedHistoryData(data);
        } catch (err) {
            console.log(`Error: ${err}`);
            return rejectWithValue('Failed');
        }
    },
);

interface IPriceChangeState {
    prices: IHistoryData[];
    status: 'loading' | 'loaded' | 'error';
}

const initialState: IPriceChangeState = {
    prices: [],
    status: 'loading',
};

const priceChangeSlice = createSlice({
    name: 'priceChange',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPriceChange.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPriceChange.fulfilled, (state, action) => {
                state.status = 'loaded';
                state.prices = action.payload;
            })
            .addCase(fetchPriceChange.rejected, (state) => {
                state.status = 'error';
                state.prices = [];
            });
    },
});

export const priceChangeReducer = priceChangeSlice.reducer;
