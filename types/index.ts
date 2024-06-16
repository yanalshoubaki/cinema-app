export interface Response<T = unknown[]> {
  page: number;
  results: T;
  total_pages: number;
  total_results: number;
}

export interface MovieResult {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export type SeriesResult = {
  adult: boolean
  backdrop_path: string
  genre_ids: Array<number>
  id: number
  origin_country: Array<string>
  original_language: string
  original_name: string
  overview: string
  popularity: number
  poster_path: string
  first_air_date: string
  name: string
  vote_average: number
  vote_count: number
}

export interface Dates {
  maximum: string;
  minimum: string;
}

export type Genres = {
  id: number
  name: string
}
export type ProductionCompanies = {
  id: number
  logo_path?: string
  name: string
  origin_country: string
}
export type MovieEntity = {
  adult: boolean
  backdrop_path: string
  belongs_to_collection: {
    id: number
    name: string
    poster_path: string
    backdrop_path: string
  }
  budget: number
  genres: Genres[]
  homepage: string
  id: number
  imdb_id: string
  origin_country: Array<string>
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  production_companies: ProductionCompanies[]
  production_countries: {
    iso_3166_1: string
    name: string
  }[]
  release_date: string
  revenue: number
  runtime: number
  spoken_languages: {
    english_name: string
    iso_639_1: string
    name: string
  }[]
  status: string
  tagline: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}


export type SeriesEntity = {
  adult: boolean
  backdrop_path: string
  created_by: CreatedBy[]
  episode_run_time: number[]
  first_air_date: string
  genres: Genre[]
  homepage: string
  id: number
  in_production: boolean
  languages: string[]
  last_air_date: string
  last_episode_to_air: LastEpisodeToAir
  name: string
  next_episode_to_air: NextEpisodeToAir
  networks: Network[]
  number_of_episodes: number
  number_of_seasons: number
  origin_country: string[]
  original_language: string
  original_name: string
  overview: string
  popularity: number
  poster_path: string
  production_companies: ProductionCompany[]
  production_countries: ProductionCountry[]
  seasons: Season[]
  spoken_languages: SpokenLanguage[]
  status: string
  tagline: string
  type: string
  vote_average: number
  vote_count: number
  credits: Credits
  videos: Videos
  images: Images
  recommendations: Recommendations
}

export interface CreatedBy {
  id: number
  credit_id: string
  name: string
  original_name: string
  gender: number
  profile_path: string
}

export interface Genre {
  id: number
  name: string
}

export interface LastEpisodeToAir {
  id: number
  overview: string
  name: string
  vote_average: number
  vote_count: number
  air_date: string
  episode_number: number
  episode_type: string
  production_code: string
  runtime: number
  season_number: number
  show_id: number
  still_path: string
}

export interface NextEpisodeToAir {
  id: number
  overview: string
  name: string
  vote_average: number
  vote_count: number
  air_date: string
  episode_number: number
  episode_type: string
  production_code: string
  runtime: any
  season_number: number
  show_id: number
  still_path: string
}

export interface Network {
  id: number
  logo_path: string
  name: string
  origin_country: string
}

export interface ProductionCompany {
  id: number
  logo_path?: string
  name: string
  origin_country: string
}

export interface ProductionCountry {
  iso_3166_1: string
  name: string
}

export interface Season {
  air_date?: string
  episode_count: number
  id: number
  name: string
  overview: string
  poster_path?: string
  season_number: number
  vote_average: number
}

export interface SpokenLanguage {
  english_name: string
  iso_639_1: string
  name: string
}

export interface Credits {
  cast: Cast[]
  crew: Crew[]
}

export interface Cast {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string
  character: string
  credit_id: string
  order: number
}

export interface Crew {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path?: string
  credit_id: string
  department: string
  job: string
}

export interface Videos {
  results: Result[]
}

export interface Result {
  iso_639_1: string
  iso_3166_1: string
  name: string
  key: string
  site: string
  size: number
  type: string
  official: boolean
  published_at: string
  id: string
}

export interface Images {
  backdrops: Backdrop[]
  logos: Logo[]
  posters: Poster[]
}

export interface Backdrop {
  aspect_ratio: number
  height: number
  iso_639_1?: string
  file_path: string
  vote_average: number
  vote_count: number
  width: number
}

export interface Logo {
  aspect_ratio: number
  height: number
  iso_639_1: string
  file_path: string
  vote_average: number
  vote_count: number
  width: number
}

export interface Poster {
  aspect_ratio: number
  height: number
  iso_639_1?: string
  file_path: string
  vote_average: number
  vote_count: number
  width: number
}

export interface Recommendations {
  page: number
  results: Result2[]
  total_pages: number
  total_results: number
}

export interface Result2 {
  backdrop_path: string
  id: number
  original_name: string
  overview: string
  poster_path: string
  media_type: string
  adult: boolean
  name: string
  original_language: string
  genre_ids: number[]
  popularity: number
  first_air_date: string
  vote_average: number
  vote_count: number
  origin_country: string[]
}

export type SeriesSeasonEntity = {
  _id: string
  air_date: string
  episodes: Array<{
    air_date: string
    episode_number: number
    episode_type: string
    id: number
    name: string
    overview: string
    production_code: string
    runtime: number
    season_number: number
    show_id: number
    still_path: string
    vote_average: number
    vote_count: number
    crew: Array<{
      job: string
      department: string
      credit_id: string
      adult: boolean
      gender: number
      id: number
      known_for_department: string
      name: string
      original_name: string
      popularity: number
      profile_path?: string
    }>
    guest_stars: Array<{
      character: string
      credit_id: string
      order: number
      adult: boolean
      gender: number
      id: number
      known_for_department: string
      name: string
      original_name: string
      popularity: number
      profile_path?: string
    }>
  }>
  name: string
  overview: string
  id: number
  poster_path: string
  season_number: number
  vote_average: number
  videos: {
    results: Array<{
      iso_639_1: string
      iso_3166_1: string
      name: string
      key: string
      site: string
      size: number
      type: string
      official: boolean
      published_at: string
      id: string
    }>
  }
  images: {
    posters: Array<{
      aspect_ratio: number
      height: number
      iso_639_1?: string
      file_path: string
      vote_average: number
      vote_count: number
      width: number
    }>
  }
}
