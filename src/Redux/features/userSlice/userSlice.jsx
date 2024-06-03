import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import auth from "../../../../firebase/firebase.config";

const initialState = {
    name: '',
    email: '',
    isLoadingFullPage: true,
    isLoading: false,
    isError: false,
    error: ''
}
export const createUser = createAsyncThunk('userSlice/createUser', async ({ email, password, name }) => {
    console.log(email, password);
    const data = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(auth.currentUser, {
        displayName: name,

    })
    return {
        name: data?.user?.displayName,
        email: data?.user?.email
    }
})
const userSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        storeUser: (state, { payload }) => {
            state.name = payload.name;
            state.email = payload.email;
        },
        toggleLoading: (state) => {
            state.isLoadingFullPage = false
        },
        removeUserData: (state) => {
            state.name = '';
            state.email = ''
        },
        makeDefault: (state) => {
            state.isError = false,
                state.error = ''
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createUser.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.email = '';
            state.name = '';
            state.error = ''
        })
            .addCase(createUser.fulfilled, (state, { payload }) => {
                console.log(payload);
                state.isLoading = false;
                state.isError = false;
                state.email = payload?.email;
                state.name = payload?.name;
                state.error = ''
            })
            .addCase(createUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.email = '';
                state.name = '';
                state.error = action?.error?.message
            })
    }
})
export const { storeUser, toggleLoading, removeUserData, makeDefault } = userSlice.actions
export default userSlice.reducer 