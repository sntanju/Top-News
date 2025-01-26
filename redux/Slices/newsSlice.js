const initialState = {
    news: [],
    newsFromApi: [],
};

export const fetchApiUsers = createAsyncThunk("getUsersFromAPI", async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    return response.json();
});