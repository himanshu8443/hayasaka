import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    languages:  ['english'],
};

const languagesSlice = createSlice({
    name: "languages",
    initialState,
    reducers: {
        setLanguages: (state, action) => {
            state.languages = action.payload;
        },
    },
})

export const { setLanguages } = languagesSlice.actions;
export default languagesSlice.reducer;

