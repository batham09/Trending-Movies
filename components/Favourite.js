import React, { Component } from 'react'
import { movies } from './getMovies'

export default class Favourite extends Component {
    constructor(){
        super();
        this.state={
            genres:[],
            currgen: "All Genres",
            movies:[],
            currText:'',
            limit:5,
            currPage:1

        }
    }

    componentDidMount(){
        let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
                        27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};
        let data= JSON.parse(localStorage.getItem("movies")|| "[]")
        let temp= [];
        data.forEach((movieObj) =>{
            if(!temp.includes(genreids[movieObj.genre_ids[0]])){
                temp.push(genreids[movieObj.genre_ids[0]]);
            }
        })
        temp.unshift('All Genres');
        this.setState({
            genres:[...temp],
            movies:[...data]
        })
    }

    handleGenreChange=(genres)=>{
        this.setState({
            currgen:genres
        })
    }

    handleDelete= (movieObj) =>{
        let newArr=[]
        newArr= this.state.movies.filter((movieid)=> movieObj.id!= movieid.id)
        this.setState({
            movies:[...newArr]

        })

        localStorage.setItem('movies', JSON.stringify(newArr));
    }

    sortPopuDesc=()=>{
        let temp= this.state.movies;
        temp.sort(function(objA, objB){
            return objB.popularity - objA.popularity 
        })
        this.setState({
            movies:[...temp]
        })
    }

    sortPopuAscen=()=>{
        let temp= this.state.movies;
        temp.sort(function(objA, objB){
            return objA.popularity - objB.popularity 
        })
        this.setState({
            movies:[...temp]
        })
    }
    sortRateAscen=()=>{
        let temp= this.state.movies;
        temp.sort(function(objA, objB){
            return objA.vote_average - objB.vote_average 
        })
        this.setState({
            movies:[...temp]
        })
    }
    sortRateDesc=()=>{
        let temp= this.state.movies;
        temp.sort(function(objA, objB){
            return objB.vote_average - objA.vote_average 
        })
        this.setState({
            movies:[...temp]
        })
    }
    handlePageChange=(page)=>{
        this.setState({
            currPage:page
        })
    }


    render() {
        let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
                        27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};

        let filterArr = [];

        if(this.state.currText ==''){
           filterArr= this.state.movies
        }else{
            filterArr= this.state.movies.filter((movieObj)=>{
                let title= movieObj.original_title.toLowerCase();
                return title.includes(this.state.currText.toLowerCase());
            })
        }
        if(this.state.currgen !="All Genres"){
            filterArr= this.state.movies.filter((movieObj) => genreids[movieObj.genre_ids[0]] == this.state.currgen)
        }
            // pagination ke liye kuch maths lagaya hai
        let pages = Math.ceil(filterArr.length/this.state.limit);
        let pagesarr = [];
        for(let i=1;i<=pages;i++){
            pagesarr.push(i);
        }
        let si = (this.state.currPage-1)*this.state.limit;
        let ei = si+this.state.limit;
        filterArr = filterArr.slice(si,ei);

        return (
        <div>
            <>
            <div className='main'>
                <div className='row'>
                    <div className='col-lg-3 col-sm-12'>
                    <ul class="list-group favourites-genres ">
                        {
                            this.state.genres.map((genres)=>(
                                this.state.currgen == genres?
                                <li class="list-group-item" style={{backgroundColor:'#3f51b5', color:'white', fontWeight:'bold'}} >{genres}</li>:
                                <li class="list-group-item" style={{backgroundColor:'white', color:'#3f51b5'}} onClick={()=>this.handleGenreChange(genres)} >{genres}</li>

                             ))
                        }
                        
                    </ul>
                    </div>
                    <div className='col-lg-9 favourites-table col-sm-12'>
                        <div className='row'>
                        <input type='text' className='input-group-text col' value={this.state.currText} onChange={(e)=> this.setState({currText:e.target.value})}/>
                        <input type='number' className='input-group-text col'value={this.state.limit} onChange={(e)=>this.setState({limit:e.target.value})}/>
                        </div>
                        <div className='row'>
                        <table class="table">
                        <thead>
                            <tr>
    
                            <th scope="col">title</th>
                            <th scope="col">genres</th>
                            <th scope="col"><i class="fas fa-sort-up" onClick={this.sortPopuDesc}></i>popularty<i class="fas fa-sort-down" onClick={this.sortPopuAscen}></i></th>
                            <th scope="col"><i class="fas fa-sort-up" onClick={this.sortRateDesc}></i>rating<i class="fas fa-sort-down" onClick={this.sortRateAscen}></i></th>
                            <th scope="col"></th>


                            </tr>
                        </thead>
                        <tbody>
                            {
                                filterArr.map((movieObj)=>(
                                    <tr>
                                    <td><img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} alt={movieObj.title} style={{width:'4rem'}}/>{movieObj.original_title}</td>
                                    <td>{genreids[movieObj.genre_ids[0]]}</td>
                                    <td>{movieObj.popularity}</td>
                                    <td>{movieObj.vote_average}</td>
                                    <td><button type="button" class="btn btn-danger" onClick={() => this.handleDelete(movieObj)}>Delete</button></td>


                                    </tr>
                                ))
                            }
                        </tbody>
                        </table>
                        </div>
                        <div className='pagination'>
                        <nav aria-label="Page navigation example">
                            <ul class="pagination">
                            {
                                pagesarr.map((page)=>(
                                    <li class="page-item"><a class="page-link" onClick={()=>this.handlePageChange(page)}>{page}</a></li>
                                ))
                            }
                            </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </>
    </div>
        )
    }
}
