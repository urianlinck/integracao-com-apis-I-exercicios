import React, { useEffect, useState } from 'react'
import { Botao, ContainerInputs, ContainerMusicas, InputMusica, Musica } from './styled'
import axios from 'axios'


export default function Musicas(props) {
    const [musicas, setMusicas] = useState([])

    const pegarMusicas = () => {
        axios.get(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.playlist.id}/tracks`, {
            headers: {
                Authorization: 'urian-linck-faruqi'
            }
        })
        .then((resposta)=>{
            setMusicas(resposta.data.result.tracks)
        })
        .catch((erro)=>{
            console.log(erro)
        })
    }
    useEffect(()=>{
        pegarMusicas()
    }, [])

    const [musica, setMusica] = useState("")
    const [artista, setArtista] = useState("")
    const [url, setUrl] = useState("")

    const body = {
        "name": musica, 
        "artist": artista,
        "url": url
    }
    const adicionarMusica = ()=>{
        axios.post(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.playlist.id}/tracks`, body, {
            headers: {
                Authorization: 'urian-linck-faruqi'
            }
        })
         }

    const removerMusica = (musica) => {
        axios.delete(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.playlist.id}/tracks/${musica.id}`, {
            headers: {
                Authorization: 'urian-linck-faruqi'
            }
        })
         
    }

    useEffect(()=>{
        pegarMusicas()
    }, [musicas, musica])

    return (
        <ContainerMusicas>
            <h2>{props.playlist.name}</h2>
            {musicas.map((musica) => {
                return (
                    <Musica key={musica.id}>
                        <h3>{musica.name} - {musica.artist}</h3>
                        <audio src={musica.url} controls />
                        <button onClick={()=>{removerMusica(musica)}}>X</button>
                    </Musica>)
            })}
            <ContainerInputs>
                <InputMusica onChange={(e)=>{setArtista(e.target.value)}} value={artista} placeholder="artista" />
                <InputMusica onChange={(e)=>{setMusica(e.target.value)}} value={musica}placeholder="musica" />
                <InputMusica onChange={(e)=>{setUrl(e.target.value)}} value={url} placeholder="url" />
                <Botao onClick={adicionarMusica}>Adicionar musica</Botao>
            </ContainerInputs>
        </ContainerMusicas>
    )
}

