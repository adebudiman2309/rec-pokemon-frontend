import React, { useContext, useState } from 'react'
import "./myPokemon.scss"
import Container from '../../components/container/Container'
import { GlobalContext } from '../../App';
import { FixedSizeList as List } from 'react-window';
import axios from 'axios';
import Modal from '../../components/modal/Modal';


const MyPokemon = () => {
    const {state, setState} = useContext(GlobalContext);
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);
    const [isReleaseSuccess, setIsReleaseSuccess] = useState(false);
    const [nickname, setNickname] = useState("");
    const [pokemon, setPokemon] = useState();
    const [num, setNum] = useState()

    const releasePokemon = async (id) => {
        const result = await axios.get("http://localhost:5000/api/pokemon/release-pokemon")

        if(result.status == 200){
            if(result.data.data) {
                var newArr = state.filter(x => x.id !== id)
                setIsReleaseSuccess(true)
                setState(newArr)
            } else {
                setIsReleaseSuccess(false)
            }

            toggleModal1();
        }
    } 

    const renamePokemon = async (id) => {
        toggleModal2();

        const item = state.find(x => x.id == id);
        let count = item.renamedCount + 1

        const result = await axios.get("http://localhost:5000/api/pokemon/rename-pokemon/"+(count))
        
        item.renamedCount = count;

        if(result.status == 200){
            if(result.data) {                
                setNum(result.data.data);
            }  
            
            setPokemon(item);
        }
    } 

    const savePokemon = () => {
        const temp = pokemon
        temp.nickname = nickname+"-"+num
        setPokemon(temp)

        console.log(pokemon)
        var newArr = state.map(item => {
            if(item.id == pokemon.id) {
                item = pokemon;
            }            
            console.log(item.id)
            console.log(pokemon.id)

            return item;
        })

        console.log(newArr)

        setState(newArr);

        toggleModal2();
    }

    const toggleModal1 = () => {
        setShow1(!show1);
    }

    const toggleModal2 = () => {
        setShow2(!show2);
    }

    const Row = ({ index, style }) => {
        var id = state[index].id
        var img = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+id+".png"
      
        return (
        <div style={style}>
            <div className="item-container">        
              <div><img src={img}/></div>
              <div>name: {state[index].name}</div>
              <div>nickname: {state[index].nickname}</div>
            </div>
            <div className='button-container'>
                <button onClick={() => releasePokemon(id)}>Release</button>
                <button onClick={() => renamePokemon(id)}>Rename</button>
            </div>
        </div>
    )};

    return (
        <Container title="My Pokemon List">
            <div className="item-list">
                <List
                height={700}
                itemCount={state.length}
                itemSize={250}
                width={1000}
                >
                {Row}
                </List>
            </div>
            <Modal show={show1} handleClose={toggleModal1}>                 
                <div className='modal-content'>
                    {isReleaseSuccess ? <div>release success</div> : <div>release failed</div>}
                </div>               
            </Modal>
            <Modal show={show2} handleClose={toggleModal2}>                 
                <div className='modal-content'>
                    <div>
                        nickname: <input value={nickname} onChange={e => setNickname(e.target.value)}/>
                    </div>
                    <div>
                        <button onClick={savePokemon}>Save Pokemon</button>
                    </div>
                </div>                
            </Modal>
        </Container>
    )
}

export default MyPokemon