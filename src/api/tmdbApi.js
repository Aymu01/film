import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const API_KEY = "f1e458291294b5dcd400d83211144060";

export const tmdbApi = createApi({
    reducerPath: "tmdbApi",
    baseQuery: fetchBaseQuery({baseUrl:'https://api.themoviedb.org/3'}),
    endpoints: (builder) => ({
        getGenre : builder.query({
            query : () => {
               return `/genre/movie/list?api_key=${API_KEY}`
            }
        }),
        getMovies : builder.query({
            query: ({genreIdOrCategoryName,currentPage,searchQuery}) => {
               if(searchQuery){
                return `/search/movie?api_key=${API_KEY}&query=${searchQuery}`
               }
               if(genreIdOrCategoryName && typeof genreIdOrCategoryName === "string"){
                  return `/movie/${genreIdOrCategoryName}?page=${currentPage}&api_key=${API_KEY}`
               }
               if(genreIdOrCategoryName && typeof genreIdOrCategoryName === "number"){
                return `discover/movie?with_genres=${genreIdOrCategoryName}&page=${currentPage}&api_key=${API_KEY}`
               }
                return `/movie/popular?page=${currentPage}&api_key=${API_KEY}`;
            }
        }),
        getMovieInfo : builder.query({
            query: ({id}) => {
                return `/movie/${id}?append_to_response=videos,credits&api_key=${API_KEY}`
            }
        }),
        getRecommadations : builder.query({
            query: (id) => {
             return `/movie/${id}/recommendations?api_key=${API_KEY}`
            }
        }),
        getActorInfo : builder.query({
            query: (id) => {
               return `/person/${id}?api_key=${API_KEY}`
            }
        }),
        getByIdActorMovies : builder.query({
            query: ({id,currentPage}) => {
              return `/discover/movie?with_cast=${id}&api_key=${API_KEY}&page=${currentPage}`
            }
        })
    })
})

export const {
    useGetMoviesQuery,
    useGetGenreQuery,
    useGetMovieInfoQuery,
    useGetRecommadationsQuery,
    useGetActorInfoQuery,
    useGetByIdActorMoviesQuery
} = tmdbApi;