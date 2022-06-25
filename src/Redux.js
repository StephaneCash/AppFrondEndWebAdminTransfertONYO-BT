import { configureStore, createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: "user",
    initialState: [],

    reducers: {
        userConnecetd: (state, action) => {
            state.user = [...state.users, action.payload]
        }
    },
});

export const { userConnecetd } = userSlice.actions;
export default userSlice.reducer