import { createSlice } from "@reduxjs/toolkit";
import { createUser } from "./OnboardingAsyncCalls";

const initialState = {}

const onboarding = createSlice({
    name: 'onboarding',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Do something while pending if you want.
        builder.addCase(createUser.pending, (state, action) => {
            // TODO : Throw loading screens
        })
        // Do something when passes.
        builder.addCase(createUser.fulfilled, (state, action) => {
            // TODO : redirect to profile page
        })
        // Do something if fails.
        builder.addCase(createUser.rejected, (state, action) => {
            // TODO : Throw error
        })
    }})

export default onboarding.reducer