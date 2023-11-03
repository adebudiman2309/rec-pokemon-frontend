import React, { useEffect, useState } from 'react'
import "./pokemonList.scss"
import Container from '../../components/container/Container'
import { FixedSizeList as List } from 'react-window';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PokemonList = () => {
  const [data, setData] = useState();

  useEffect(() =>{
    const getData = async () => {
      const data = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=100000"
      );
      setData(data.data);
    };
    getData();
  },[])

  const Row = ({ index, style }) => {
    var item = data.results[index]
    var linkSplit = item.url.split("/")
    var id = linkSplit[linkSplit.length - 2]
    var img = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+id+".png"
  
    return (
    <div style={style}>
      <Link to={"/pokemon-detail/"+id}>
        <div className="item-container">        
          <div><img src={img}/></div>
          <div>{item.name}</div>
        </div> 
      </Link>
    </div>
  )};

  if(!data) return (<div>loading...</div>)
  return (
    <Container title="Pokemon list">
      <div className="item-list">
        <List
          height={700}
          itemCount={data.results.length}
          itemSize={150}
          width={1000}
        >
          {Row}
        </List>
      </div>
      
    </Container>
  )
}

export default PokemonList