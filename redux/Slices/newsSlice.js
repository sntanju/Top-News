import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const initialState = {
    users: [],
    usersFromApi: [],
};

export const fetchApiUsers = createAsyncThunk("getUsersFromAPI", async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    return response.json();
});

const newsSlice = createSlice({
    name: "NewsSlice",
    initialState,
    reducers: {
        addUser: (state, action) => {
            const data = {
                id: nanoid(),
                name: action.payload,
            };
            state.users.push(data);
        },
        removeUser: (state, action) => {
            const data = state.users.filter((item) => {
                return item.id !== action.payload;
            });
            state.users = data;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchApiUsers.fulfilled, (state, action) => {
            state.isLoading = false;
            state.usersFromApi = action.payload;
        });
    },
});

export const { addUser, removeUser } = newsSlice.actions;

const persistConfig = {
    key: 'userSlice',
    storage: storage,
    whitelist: ['users'], // specify any state slices that you want to persist
};

const persistedReducer = persistReducer(persistConfig, newsSlice.reducer);

export default persistedReducer;