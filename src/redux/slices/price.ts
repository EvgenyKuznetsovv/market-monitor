    import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
    import IPriceData from '../../interfaces/IPriceData';
    import { priceDataProcessed } from '../dataProcessing';
    import axios from '../../axios';

    export const fetchPrices = createAsyncThunk(
        'prices/fetchCandles',
        async ({ currency, coins }: { currency: string; coins: string[][] }, { rejectWithValue }) => {
            try {
                const url = '/ticker/price';
                const { data } = await axios.get<IPriceData[]>(url);
                return priceDataProcessed(data, currency, coins);
            } catch (err) {
                console.log(`Error: ${err}`);
                return rejectWithValue('Failed');
            }
        },
    );

    interface IPricesState {
        prices: IPriceData[];
        status: 'loading' | 'loaded' | 'error';
    }

    const initialState: IPricesState = {
        prices: [],
        status: 'loading',
    };

    const pricesSlice = createSlice({
        name: 'prices',
        initialState,
        reducers: {},
        extraReducers: (builder) => {
            builder
                .addCase(fetchPrices.pending, (state) => {
                    state.status = 'loading';
                    // state.prices = [];
                })
                .addCase(fetchPrices.fulfilled, (state, action) => {
                    state.status = 'loaded';
                    state.prices = action.payload;
                })
                .addCase(fetchPrices.rejected, (state) => {
                    state.status = 'error';
                    state.prices = [];
                });
        },
    });

    export const pricesReducer = pricesSlice.reducer;
