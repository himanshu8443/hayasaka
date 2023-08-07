import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    progress: 0,
    isTyping: false,
};

const loadingBarSlice = createSlice({
    name: "loadingBar",
    initialState,
    reducers: {
        setProgress: (state, action) => {
            state.progress = action.payload;
        },
        setIsTyping: (state, action) => {
            state.isTyping = action.payload;
        }
    },
});

export const { setProgress, setIsTyping } = loadingBarSlice.actions;
export default loadingBarSlice.reducer;