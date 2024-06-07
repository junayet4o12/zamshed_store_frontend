import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth"
import auth from "../../../../firebase/firebase.config";

const initialState = {
    user: null,
    isError: false,
    error: '',
    isLoadingFullPage: true,
    isLoading: false,
    isLoadingGoogle: false,
    isGoogleLogInCompleted: false,
    isLogInCompleted: false,
    isRegisterCompleted: false,

}
export const createUser = createAsyncThunk('userSlice/createUser', async ({ email, password, name }) => {
    const data = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(auth.currentUser, {
        displayName: name,

    })
    return {
        uid: data.user.uid,
        email: data.user.email,
        displayName: data.user.displayName,
        photoURL: data.user.photoURL,
    };
})

export const loginUser = createAsyncThunk('/userSlice/loginUser', async ({ email, password }) => {
    const data = await signInWithEmailAndPassword(auth, email, password)
    return {
        uid: data.user.uid,
        email: data.user.email,
        displayName: data.user.displayName,
        photoURL: data.user.photoURL,
    };
})

export const loginUserWithGoogle = createAsyncThunk('/userSlice/loginWithGoogle', async () => {
    const provider = new GoogleAuthProvider();
    const data = await signInWithPopup(auth, provider);
    return {
        uid: data.user.uid,
        email: data.user.email,
        displayName: data.user.displayName,
        photoURL: data.user.photoURL,
    };
})
const userSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        storeUser: (state, { payload }) => {
            state.user = payload
        },
        toggleLoading: (state) => {
            state.isLoadingFullPage = false
        },
        removeUserData: (state) => {
            state.user = null;
        },
        makeDefault: (state) => {
            state.isError = false;
            state.error = '';
            state.isLoading = false;
            state.isLoadingGoogle = false;
            state.isGoogleLogInCompleted = false;
            state.isLogInCompleted = false;
            state.isRegisterCompleted = false;

        },
        makeGoogleLoginFalse: (state) => {
            state.isGoogleLogInCompleted = false;
        }
    },
    extraReducers: (builder) => {
        builder
            // register start 
            .addCase(createUser.pending, (state) => {
                state.isLoading = true;
                state.isRegisterCompleted = false;
                state.isError = false;
                state.user = null;
                state.error = ''
            })
            .addCase(createUser.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.isRegisterCompleted = true;
                state.isError = false;
                state.user = payload;
                state.error = '';
            })
            .addCase(createUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isRegisterCompleted = false;
                state.isError = true;
                state.user = null
                state.error = action?.error?.message
            })
            // register end 

            // login Start 
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.isLogInCompleted = false;
                state.isError = false;
                state.user = null;
                state.error = ''
            })
            .addCase(loginUser.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.isLogInCompleted = true;
                state.isError = false;
                state.user = payload;
                state.error = ''
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isLogInCompleted = false;
                state.isError = true;
                state.user = null;
                state.error = action?.error?.message
            })
            // login End

            //  googleLogin start 
            .addCase(loginUserWithGoogle.pending, (state) => {
                state.isLoadingGoogle = true;
                state.isError = false;
                state.user = null;
                state.error = '';
                state.isGoogleLogInCompleted = false;
            })
            .addCase(loginUserWithGoogle.fulfilled, (state, { payload }) => {
                state.isLoadingGoogle = false;
                state.isError = false;
                state.user = payload;
                state.error = ''
                state.isGoogleLogInCompleted = true;
            })
            .addCase(loginUserWithGoogle.rejected, (state, action) => {
                state.isLoadingGoogle = false;
                state.isError = true;
                state.user = null;
                state.error = action?.error?.message;
                state.isGoogleLogInCompleted = false;
            })
        //  googleLogin end
    }
})
export const { storeUser, toggleLoading, removeUserData, makeDefault, makeGoogleLoginFalse } = userSlice.actions
export default userSlice.reducer 