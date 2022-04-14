import React, { Component } from 'react'
// import { movies } from './getMovies'
import axios from 'axios'
export default class Movies extends Component {
    constructor(){
        super();
        this.state ={
                hover:'',
                parr:[1],
                currPage:1,
                movies:[],
                favourites:[]
        }
    }
   async componentDidMount(){
        //side effects 
        let res= await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=5540e483a20e0b20354dabc2d66a31c9&language=en-US&page=${this.state.currPage}`);
        let data= res.data;
        this.setState({
            movies:[...data.results]
        })
    }

    changeMovies= async()=> {
        let res= await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=5540e483a20e0b20354dabc2d66a31c9&language=en-US&page=${this.state.currPage}`);
        let data= res.data;
        this.setState({
            movies:[...data.results]
        })  
    }

    // arrow function because we will use this here and we dont need to use bind.
    handleNext=()=>{
        let tempArr=[];
        for(let i=1; i<=this.state.parr.length+1; i++){
            tempArr.push(i);
        }

        this.setState({

            parr:[...tempArr],
            currPage: this.state.currPage+1

        }, this.changeMovies)
    }

    handlePre=()=>{
        if(this.state.currPage!=1){
            this.setState({
                currPage: this.state.currPage-1
            }, this.changeMovies)
        }
    }
    handleNumberClick=(value)=>{
        if(value!=this.state.currPage){
            this.setState({
                currPage: value
            }, this.changeMovies)
        }
    }

    handleFavourites=(movie)=>{
        
        let oldData = JSON.parse(localStorage.getItem("movies") || "[]") 
        if(this.state.favourites.includes(movie.id)){
            oldData= oldData.filter((m)=> m.id!= movie.id)
        }else{
            oldData.push(movie)
        }
        localStorage.setItem("movies" , JSON.stringify(oldData));
        console.log(oldData)
        this.handleFavouritesState();
    }
    handleFavouritesState=()=>{
        let oldData = JSON.parse(localStorage.getItem("movies") || "[]") 
        let temp= oldData.map((movie)=> movie.id);
        this.setState({
            favourites:[...temp]
        })
    }

    
    render() {
        //let movie =this.state.movies.results; 
        return (
            <div>
                {
                    this.state.movies.length ==0?
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                     </div>:
                     <div>
                     <h3 className='text-center'><strong> Trending </strong></h3>
                     <div className="movies-list">
                        {
                            this.state.movies.map((movieobj)=>(
                                <div className="card movies-card " onMouseEnter={()=> this.setState({hover: movieobj.id})} onMouseLeave={()=> this.setState({hover:''})} >
                                <img src={`https://image.tmdb.org/t/p/original${movieobj.backdrop_path}`}   alt={movieobj.title} className="card-img-top movies-img"/>
                                {/* <div className="card-body"> */}
                                <h5 className="card-title movies-title">{movieobj.original_title}</h5>
                                {/* <p className="card-text movies-text">{movieobj.overview}</p> */}
                                <div className='button-wrapper' style={{display:'flex', width:'100%', justifyContent:'center'}}>
                                    {
                                       this.state.hover == movieobj.id &&
                                <a  className="btn btn-primary movies-button" onClick={()=>this.handleFavourites(movieobj)}>{this.state.favourites.includes(movieobj.id)?"Remove from Favourites":"Add to Favourites"}</a>

                                    }
                                </div>
                            
                            
                             </div>
                            ))
                        }
                        </div>
                  <div style={{display:'flex',justifyContent:'center'}}>
                      <nav aria-label="Page navigation example">
                        <ul class="pagination">
                            <li class="page-item"><a class="page-link" onClick={this.handlePre}>Previous</a></li>
                            {
                                this.state.parr.map((value)=>(
                            <li class="page-item"><a class="page-link" onClick={()=> this.handleNumberClick(value)} >{value}</a></li>

                                ))
                            }
                            <li class="page-item"><a class="page-link" onClick={this.handleNext}>Next</a></li>
                        </ul>
                        </nav>
                  </div> 
                </div>
                }
            </div>
        )
    }
}
