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
    return (
        <div>
            {playlists.map((playlist) => {
                return <Musicas key={playlist.id} playlist={playlist}/>
            })}

        </div>
    );
}

export default Playlists;
