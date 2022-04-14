import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Navbar extends Component {
    render() {
        return (
            <div style={{display:'flex', marginLeft:'0.5rem'}}>
               <Link to='/' style={{textDecoration:'none'}}><h1 style={{marginTop:"1rem", marginLeft:'1rem'}}>MOVIES APP</h1>
                   </Link>
              <Link to='/favourites' style={{textDecoration:'none'}}><h2 style={{marginLeft:'3rem', fontSize:'25px', marginTop: '1.8rem'}}> Favourites </h2></Link>
            </div>
        )
    }
}
