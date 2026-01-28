import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { login, logout, oauth, refresh, register } from "./auth.thunks"

const initialState = {
    accessToken: '' as string,
    loading: false as boolean,
    error: '' as string
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setToken (state, action: PayloadAction<string>) {
            state.accessToken = action.payload
        }
    },

    extraReducers: (builder) => {
        builder
        .addCase(login.pending, (state) => {
            state.loading = true
        })
        .addCase(login.fulfilled, (state, action) => {
            state.loading = false
            state.accessToken = action.payload.accessToken
        }) 
        .addCase(login.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message!
        })

        .addCase(register.pending, (state) => {
            state.loading = true
        })
        .addCase(register.fulfilled, (state) => {
            state.loading = false
        })
        .addCase(register.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message!
        })

        .addCase(logout.pending, (state) => {
            state.loading = true
        })
        .addCase(logout.fulfilled, (state) => {
            state.loading = false
            state.accessToken = ""
            state.error = ""
            
        })
        .addCase(logout.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message!
        })


        .addCase(oauth.pending, (state) => {
            state.loading = true
        })
        .addCase(oauth.fulfilled, (state, action) => {
            state.loading = false
            state.accessToken = action.payload.accessToken
        })
        .addCase(oauth.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message!
        })


        .addCase(refresh.fulfilled, (state, action) => {
            state.loading = false
            state.accessToken = action.payload.accessToken
        })
        .addCase(refresh.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message!
        })

    }
})

export const {
    setToken
} = authSlice.actions

export default authSlice.reducer