import axios from "axios";
import {
    TMDB_API,
    TMDB_API_KEY,
} from "../common/config";
import {
    GENRE_ID_GET_MOVIES,
    MOVIE_GENRE_LIST,
    MOVIE_POPULAR_RATED,
    MOVIE_ID_DETAILS,
    GET_CATEGORY_MOVIES,
    SEARCH_QUERY,
    TV_POPULAR_RATED,
    MOVIE_ID_INFO_DETAILS
} from "./actions.type";
import {
    SET_MOVIE_POPULAR_RATED,
    SET_GENRE_ID_MOVIES,
    SET_GENRE_LIST,
    SET_MOVIE_DETAILS,
    SET_MOVIE_DETAIL_CAST_DIRECTOR,
    SET_COMEDY,
    SET_ACTION,
    SET_HORROR,
    SET_THRILLER,
    SET_CRIME,
    SET_DRAMA,
    SET_ADVENTURE,
    SET_TRAILER_VIDEOS,
    SET_SEARCH_QUERY,
    SET_QUERY,
    SET_CATEGORY_NAME,
    SET_TV_TOP_RATED,
    SET_MOVIE_OR_TV,
    SET_MOVIE_INFO,
    SET_MOVIE_INFO_TRAILER,
} from "./mutations.type";

const state = {
    popularMovieList: [],
    tvTopRated: [],
    genreList: [],
    genreIdMovies: [],
    movieDetail: [],
    cast: [],
    director: [],
    movieGenre: [],
    similarMovies: [],
    productionCompany: [],
    action: [],
    comedy: [],
    horror: [],
    thriller: [],
    crime: [],
    drama: [],
    adventure: [],
    video: '',
    videoInfo: '',
    searchData: [],
    isMovieOrTv: null,
    query: localStorage.getItem('query') ? localStorage.getItem('query') : '',
    movieInfo: [],
};

const getters = {
    setPopularMovieList(state) {
        return state.popularMovieList;
    },
    setGenreList(state) {
        return state.genreList;
    },
    setGenreIdMovies(state) {
        return state.genreIdMovies;
    },
    setMovieDetail(state) {
        return state.movieDetail;
    },
    setCast(state) {
        return state.cast;
    },
    setDirector(state) {
        return state.director;
    },
    setMovieGenre(state) {
        return state.movieGenre;
    },
    setSimilar(state) {
        return state.similarMovies;
    },
    setProductionCompany(state) {
        return state.productionCompany
    },
    setComedy(state) {
        return state.comedy
    },
    setAction(state) {
        return state.action
    },
    setHorror(state) {
        return state.horror
    },
    setThriller(state) {
        return state.thriller
    },
    setCrime(state) {
        return state.crime
    },
    setDrama(state) {
        return state.drama
    },
    setAdventure(state) {
        return state.adventure
    },
    setTrailerVideo(state) {
        return state.video
    },
    setSearchData(state) {
        return state.searchData
    },
    setQuery(state) {
        return state.query
    },
    setTvTopRated(state) {
        return state.tvTopRated
    },
    setMovieOrTv(state) {
        return state.isMovieOrTv
    },
    setMovieInfo(state) {
        return state.movieInfo
    },
    setMovieInfoTrailer(state) {
        return state.videoInfo
    },

};

const actions = {
    [MOVIE_POPULAR_RATED](context, credentials) {
        const page = credentials ? 2 : 1
        axios.get(`${TMDB_API}movie/popular?api_key=${TMDB_API_KEY}&language=tr-Tr&page=${page}`).then(_ => {
            if (_.status === 200) {
                context.commit(SET_MOVIE_POPULAR_RATED, _.data.results)
            }
        }).catch(err => {
            console.log(`err`, err)
        })
    },
    [TV_POPULAR_RATED](context) {
        axios.get(`${TMDB_API}tv/top_rated?api_key=${TMDB_API_KEY}&language=tr-Tr&page=2`).then(_ => {
            if (_.status === 200) {
                context.commit(SET_TV_TOP_RATED, _.data.results)
            }
        }).catch(err => {
            console.log(`err`, err)
        })
    },
    [MOVIE_GENRE_LIST](context) {
        axios.get(`${TMDB_API}genre/movie/list?api_key=${TMDB_API_KEY}&language=tr-TR&page=1`).then(_ => {
            if (_.status === 200) {
                context.commit(SET_GENRE_LIST, _.data.genres)
            }
        }).catch(err => {
            console.log(`err`, err)
        })
    },
    [GENRE_ID_GET_MOVIES](context, credentials) {
        axios.get(`${TMDB_API}discover/movie?api_key=${TMDB_API_KEY}&with_genres=${credentials.id}&language=tr-TR&page=1`).then(_ => {
            if (_.status === 200) {
                console.log(`_`, _)
                context.commit(SET_GENRE_ID_MOVIES, _.data.results)
                context.commit(SET_CATEGORY_NAME, credentials.name)
            }
        }).catch(err => {
            console.log(`err`, err)
        })
    },
    [MOVIE_ID_DETAILS](context, credentials) {
        const tvOrMovie = credentials.category === true ? 'tv' : 'movie'
        axios.get(`${TMDB_API}${tvOrMovie}/${credentials.id}?api_key=${TMDB_API_KEY}&language=tr-TR&page=1&append_to_response=similar,changes, credits, images, keywords, lists, releases, reviews, translations, videos`).then(_ => {
            if (_.status === 200) {
                context.commit(SET_MOVIE_DETAILS, _.data)
            }
        }).catch(err => {
            console.log(`err`, err)
        });
        axios.get(`${TMDB_API}${tvOrMovie}/${credentials.id}/credits?api_key=${TMDB_API_KEY}&language=tr-TR&page=1`).then(_ => {
            if (_.status === 200) {
                context.commit(SET_MOVIE_DETAIL_CAST_DIRECTOR, _.data)
            }
        }).catch(err => {
            console.log(`err`, err)
        });
        axios.get(`${TMDB_API}${tvOrMovie}/${credentials.id}/videos?api_key=${TMDB_API_KEY}&language=tr-TR&page=1`).then(_ => {
            if (_.status === 200) {
                context.commit(SET_TRAILER_VIDEOS, _.data.results)
            }
        }).catch(err => {
            console.log(`err`, err)
        });
    },
    [MOVIE_ID_INFO_DETAILS](context, credentials) {
        const tvOrMovie = credentials.category == true ? 'movie' : 'tv'
        axios.get(`${TMDB_API}${tvOrMovie}/${credentials.id}?api_key=${TMDB_API_KEY}&language=tr-TR&page=1&append_to_response=similar,changes, credits, images, keywords, lists, releases, reviews, translations, videos`).then(_ => {
            if (_.status === 200) {
                context.commit(SET_MOVIE_INFO, _.data)
            }
        }).catch(err => {
            console.log(`err`, err)
        });
        axios.get(`${TMDB_API}${tvOrMovie}/${credentials.id}/videos?api_key=${TMDB_API_KEY}&language=tr-TR&page=1`).then(_ => {
            if (_.status === 200) {
                context.commit(SET_MOVIE_INFO_TRAILER, _.data.results)
            }
        }).catch(err => {
            console.log(`err`, err)
        });
    },
    [GET_CATEGORY_MOVIES](context, credentials) {
        const tvOrMovie = credentials ? 'tv' : 'movie'
        const tvGenres = [35, 10759, 16, 10751, 80, 18, 10763]
        const movieGenres = [35, 28, 27, 53, 80, 18, 12]
        const genres = tvOrMovie == 'tv' ? tvGenres : movieGenres
        axios.all([
                axios.get(`${TMDB_API}discover/${tvOrMovie}?api_key=${TMDB_API_KEY}&with_genres=${genres[0]}&language=tr-TR&page=1`), //Comedy
                axios.get(`${TMDB_API}discover/${tvOrMovie}?api_key=${TMDB_API_KEY}&with_genres=${genres[1]}&language=tr-TR&page=1`), //Action
                axios.get(`${TMDB_API}discover/${tvOrMovie}?api_key=${TMDB_API_KEY}&with_genres=${genres[2]}&language=tr-TR&page=1`), //Horror
                axios.get(`${TMDB_API}discover/${tvOrMovie}?api_key=${TMDB_API_KEY}&with_genres=${genres[3]}&language=tr-TR&page=1`), //Thriller
                axios.get(`${TMDB_API}discover/${tvOrMovie}?api_key=${TMDB_API_KEY}&with_genres=${genres[4]}&language=tr-TR&page=1`), //Crime
                axios.get(`${TMDB_API}discover/${tvOrMovie}?api_key=${TMDB_API_KEY}&with_genres=${genres[5]}&language=tr-TR&page=1`), //Drama
                axios.get(`${TMDB_API}discover/${tvOrMovie}?api_key=${TMDB_API_KEY}&with_genres=${genres[6]}&language=tr-TR&page=1`) //Adventure
            ])
            .then(axios.spread((Comedy, Action, Horror, Thriller, Crime, Drama, Adventure) => {
                context.commit(SET_COMEDY, Comedy.data.results)
                context.commit(SET_ACTION, Action.data.results)
                context.commit(SET_HORROR, Horror.data.results)
                context.commit(SET_THRILLER, Thriller.data.results)
                context.commit(SET_CRIME, Crime.data.results)
                context.commit(SET_DRAMA, Drama.data.results)
                context.commit(SET_ADVENTURE, Adventure.data.results)
            })).catch(err => {
                console.log(`err`, err)
            })
    },
    [SEARCH_QUERY](context, credentials) {
        axios.get(`${TMDB_API}search/movie?api_key=${TMDB_API_KEY}&language=tr-TR&query=${credentials}&page=1&include_adult=false`).then(_ => {
            if (_.status === 200) {
                context.commit(SET_QUERY, credentials)
                context.commit(SET_SEARCH_QUERY, _.data.results)
            }
        }).catch(err => {
            console.log(`err`, err)
        });
    },
};

const mutations = {
    [SET_MOVIE_OR_TV](state, item) {
        state.isMovieOrTv = item;
    },
    [SET_TV_TOP_RATED](state, item) {
        state.tvTopRated = item
    },
    [SET_CATEGORY_NAME](state, item) {
        state.categoryName = item
    },
    [SET_QUERY](state, item) {
        state.query = item
        localStorage.setItem('query', item)
    },
    [SET_SEARCH_QUERY](state, item) {
        state.searchData = item;
    },
    [SET_TRAILER_VIDEOS](state, item) {
        state.video = item[0] ? item[0].key : '';
    },
    [SET_MOVIE_INFO_TRAILER](state, item) {
        state.video = item[0] ? item[0].key : '';
    },
    [SET_COMEDY](state, item) {
        state.comedy = item;
    },
    [SET_ACTION](state, item) {
        state.action = item;
    },
    [SET_HORROR](state, item) {
        state.horror = item;
    },
    [SET_THRILLER](state, item) {
        state.thriller = item;
    },
    [SET_CRIME](state, item) {
        state.crime = item;
    },
    [SET_DRAMA](state, item) {
        state.drama = item;
    },
    [SET_ADVENTURE](state, item) {
        state.adventure = item;
    },
    [SET_MOVIE_POPULAR_RATED](state, item) {
        state.popularMovieList = item
    },
    [SET_GENRE_ID_MOVIES](state, item) {
        state.genreIdMovies = item
    },
    [SET_GENRE_LIST](state, item) {
        state.genreList = item
    },
    [SET_MOVIE_INFO](state, item) {
        state.movieInfo = item;
    },
    [SET_MOVIE_DETAILS](state, item) {
        state.movieDetail = item;
        state.similarMovies = item.similar.results;
        state.movieGenre = item.genres.map((y) =>
            y.name
        );
        item.production_companies.map(y => {
            state.productionCompany.push(y.name)
        })
    },
    [SET_MOVIE_DETAIL_CAST_DIRECTOR](state, item) {
        item.cast.map(y => {
            if (y.known_for_department === "Acting") {
                state.cast.push(y.name)
            }
        });
        item.crew.map(y => {
            if (y.known_for_department === "Directing") {
                state.director.push(y.name)
            }
        })
    }

};

export default {
    state,
    actions,
    mutations,
    getters
};