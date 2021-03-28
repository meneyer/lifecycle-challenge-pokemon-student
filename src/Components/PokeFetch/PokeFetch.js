import React, { Component } from 'react'
import './PokeFetch.css';

class PokeFetch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pokeInfo: '',
      pokeSprite: '',
      pokeName: '',
      currentCount: 10,
      intervalId: '',
      pokemonAlive: false,
    }
  }

  fetchPokemon() {
    let min = Math.ceil(1);
    let max = Math.floor(152);
    let pokeNum = Math.floor(Math.random() * (max - min) + min);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`, {
      method: 'GET'
    }).then(res => res.json())
      .then(res => {
        this.setState({
          pokeInfo: res,
          pokeSprite: res.sprites.front_default,
          pokeName: res.species.name,
          pokemonAlive: false,
          currentCount: 10,
        })
      })
      .catch((err) => console.log(err))
  }

  timer() {
    let intervalId = setInterval(() => this.tick(), 1000);
    this.setState({intervalId: intervalId})
  }
  
  tick(){
    if (this.state.currentCount > 0) {
      this.setState({ currentCount: this.state.currentCount - 1 })
  } else {
    clearInterval(this.intervalId)
    this.setState({pokemonAlive: true})
  }}

  componentDidUpdate(prevProps, prevState){
    if(prevState.pokeName !== this.state.pokeName){
    this.timer()
    }
  }


  render() {
    return (
      <div className={'wrapper'}>
        <button className={'start'} 
            onClick={() => this.fetchPokemon()}>Start!</button>
        <h1 className={'timer'} >{this.state.currentCount}</h1>
        <div className={'pokeWrap'}>
          <img className={'pokeImg'} style={this.state.pokemonAlive ? { filter: "brightness(100%)" }: { filter: "brightness(0%)" }} src={this.state.pokeSprite} />
          <h1 className={'pokeName'} style={this.state.pokemonAlive ? { display: "" }: { display: "none" }}>{this.state.pokeName} </h1>
        </div>
      </div>
    )
  }
}

export default PokeFetch;