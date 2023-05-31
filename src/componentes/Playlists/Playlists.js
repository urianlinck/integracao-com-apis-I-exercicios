import React, {  useEffect, useState } from "react";
import Musicas from "../Musicas/Musicas";
import axios from "axios";

function Playlists() {
    const [playlists, setPlaylists] = useState([])
    
    const pegarPlaylist = () => {
        axios.get('https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists', {headers:{
            Authorization: 'urian-linck-faruqi'
        }})
        .then((resposta)=>{
            setPlaylists(resposta.data.result.list)
            // setTimeout(() => {
            //     console.log(playlists)                
            // }, 1000);
        })
        .catch((erro)=>{
            console.log(erro)
        })
    }
    useEffect(()=>{
        pegarPlaylist()
    }, [])
    const AUTH_TOKEN = 'urian-linck-faruqi'

    const [procurarPlaylist, setProcurarPlaylist] = useState("")

    const acharPlaylist = async () => {
        try{
        const resposta = await axios.get(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/search?name=${procurarPlaylist}`, {headers: {
            Authorization: AUTH_TOKEN
        }
        })
        setPlaylists(resposta.data.result.playlist)
        
        }catch(error){
        
        }finally{

        }
    }
    
    
    return (
        <div>
            {playlists.map((playlist) => {
                return <Musicas key={playlist.id} playlist={playlist} pegarPlaylist={pegarPlaylist}/>
            })}
        <input onChange={(e)=>{setProcurarPlaylist(e.target.value)}} value={procurarPlaylist} placeholder="nome da playlist"/>
        <button onClick={acharPlaylist}>Procurar</button>

        
        
        </div>
    );
}

export default Playlists;
