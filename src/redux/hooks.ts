import {
    TypedUseSelectorHook,
    useDispatch as useReduxDispatch,
    useSelector as useReduxSelector,
} from 'react-redux';
import type { AppDispatch, RootState } from './Store';

export const useDispatch = useReduxDispatch<AppDispatch>;
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
