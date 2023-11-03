import React, { useContext, useEffect, useState } from 'react'
import "./pokemonDetail.scss"
import Container from '../../components/container/Container'
import { Link, useParams } from 'react-router-dom';
import { FixedSizeList as List } from 'react-window';
import axios from 'axios';
import Modal from '../../components/modal/Modal';
import { GlobalContext } from '../../App';

const PokemonDetail = () => {
    const [data, setData] = useState();
    const [show, setShow] = useState(false);
    const [isCatchSuccess, setIsSuccess] = useState(false)
    const [nickname, setNickname] = useState("");
    let { id } = useParams();

    const {state, setState} = useContext(GlobalContext);

    useEffect(() =>{
        // get({url:'pokemon'}, setData)
        const getData = async () => {
          const data = await axios.get(
            "https://pokeapi.co/api/v2/pokemon/"+id
          );
          setData(data.data);
        };
        getData();
    },[])

    const onClickCatch = async () => {
        const result = await axios.get("http://localhost:5000/api/pokemon/catch-pokemon")
        if(result.status == 200){
            if(result.data.data) {
                setIsSuccess(true);
            } else {
                setIsSuccess(false)
            }
            toggleModal();
        }
    }

    const toggleModal = () => {
        setShow(!show);
    }

    const savePokemon = () => {
        if(!state.find(x => x.id == id)) {
            setState([...state, {id: id, nickname: nickname, name: data.name, renamedCount:0}])
        }

        toggleModal();
    }

    const Row = ({ index, style }) => {       
        var move = data.moves[index].move
        return (
        <div style={style}>
            <div className="move-container">
              <div>{index+1}. {move.name}</div>
            </div>
        </div>
    )};

    if(!data) return (<div>loading...</div>)

    return (
        <GlobalContext.Provider>
        <Container title="Pokemon Detail">
            <span className="subtitle">Pokemon name: {data.name}</span>
            <div className='pokemon-info-container'>
                <div className='pics-container'>
                    <img src={data.sprites.front_default} width={150} height={150}/>
                </div>
                <div className='catch-button-container'>
                    <button className='catch-button' onClick={onClickCatch}>Catch</button>
                </div>
                
            </div>
            <hr/>
            <span className="subtitle">moves</span>
            <div className='moves'>
                <List
                    height={400}
                    itemCount={data.moves.length}
                    itemSize={25}
                    width={1000}
                    >
                    {Row}
                </List>
            </div>
            <hr/>
            <span className="subtitle">types</span>
            <div>
                <ul>
                    {data.types.map(item => (<li>{item.type.name}</li>))}
                </ul>
            </div>
            <Modal show={show} handleClose={toggleModal}>
                {isCatchSuccess ? 
                <div className='modal-content'>
                    <div>
                        nickname: <input value={nickname} onChange={e => setNickname(e.target.value)}/>
                    </div>
                    <div>
                        <button onClick={savePokemon}>Save Pokemon</button>
                    </div>
                </div> : <div>catch failed</div>}                
            </Modal>
        </Container>
        </GlobalContext.Provider>
    )
}

export default PokemonDetail