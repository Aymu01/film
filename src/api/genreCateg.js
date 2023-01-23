import { createSlice } from "@reduxjs/toolkit";
export const genreOrCategory = createSlice({
    name: "genreOrCategory",
    initialState: {
        genreIdOrCategoryName: '',
        entry: "",
        favData: [],
        watchList: []
    },
    reducers: {
        selectGenreOrCategory: (state, action) => {
            state.genreIdOrCategoryName = action.payload;
            state.searchQuery = ''
        },
        addFavMovie: (state, action) => {
            return { ...state, favData: [...state.favData, action.payload] }
        },
        removeFavMovie: (state, action) => {
            state.favData = state.favData.filter(fav => fav.id !== action.payload)
        },
        addWatchMovie: (state, action) => {
            return { ...state, watchList: [...state.watchList, action.payload] }
        },
        removeWatchMovie: (state, action) => {
            state.watchList = state.watchList.filter(watch => watch.id !== action.payload)
        },
        entryData: (state, action) => {
            state.entry = action.payload
        },
        deleteEntry : (state,action) => {
            state.entry = ""
        }
    }
})

export const {
    selectGenreOrCategory,
    addFavMovie,
    removeFavMovie,
    entryData,
    addWatchMovie,
    removeWatchMovie,
    deleteEntry 
} = genreOrCategory.actions;
export default genreOrCategory.reducer;