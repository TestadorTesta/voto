import React, { useState, useEffect } from 'react'
import wilsinho from './assets/wilsinho.jpeg'
import leandro from './assets/leandro.jpeg'
import instaVender from './assets/anuncio1.png'
import formasVender from './assets/anuncio2.png'
import validaCpf from './validaCpf.jsx'
import votar from './votar.jsx'
import axios from 'axios'
import './App.css'

function App() {

  const [ showModal, setShowModal] = useState(false)
  const [ identificador, setIdentificador] = useState('')
  const [ nome, setNome ] = useState('')
  const [ aviso, setAviso ] = useState(0)
  const [ total, setTotal ] = useState(null)
  const [ msg, setMsg ] = useState('')
  const [ statusMsg, setStatusMsg ] = useState(false)

  

  useEffect(() => {
    const getVotos = async () => {
      try {
        await axios.get('http://35.199.79.58:3000/totalVotado')//(`http://localhost:3000/totalVotado`)
        .then(response => {
          setTotal(response.data)
        })
        .catch(e => {
          console.log(e)
        })
      } catch(erro){
        console.log(erro)
      }
    }

    getVotos()
  },[])
  
  
  return (
    <>
    <section className="anuncio">
        <a href="https://go.hotmart.com/D94883984J?dp=1" target='_blank'>
          <img src={instaVender} alt="" />
        </a>
    </section>

      <h1>VOTE NO SEU</h1>
      
      <figure className='candidatos'>
        <p className='candidatos-p'>
          {total && <h4>{Object.values(total)[0]['wilsinho']}</h4>}
          <img src={wilsinho} alt=""  className='candidatos-p-img'/>
          <button className='candidatos-p-button' onClick={() => {
            setNome('wilsinho')
            setShowModal(!showModal)
          }}>MEU PREFEITO</button>
        </p>
        <p className='candidatos-p'>
          {total && <h4>{Object.values(total)[0]['leandro']}</h4>}
          <img src={leandro} alt=""  className='candidatos-p-img'/>
          <button className='candidatos-p-button' onClick={() => {
            setNome('leandro')
            setShowModal(!showModal)
          }}>MEU PREFEITO</button>
        </p>
      </figure>

      <p>cidade: Canguaretama</p>

      {statusMsg && (<h1>Votado</h1>)}

      <footer className='rodape'>
        <p>* Esse não é um site oficial e foi 
          criado apenas para demonstrar intenção de voto de candidatos da cidade.
          <br/>* Os votos são zerados todo início de mês.</p>
      </footer>

      <section className="anuncio">
        <a href="https://go.hotmart.com/D93586274P" target='_blank'>
          <img src={formasVender} alt="" />
        </a>
    </section>
  
    {
      showModal && (
        <section className='modal'>
          <div className='modal-conteudo'>
            <div><input type="number" value={identificador} onChange={(e) => setIdentificador(e.target.value)} placeholder='Digite CPF' className='modal-input' maxLength={11} size={11}/>{identificador.length}/11</div>
            
            {aviso == 1 && (
              <span>Digite apenas 11 numeros</span>
            )}
            {aviso == 2 && (
                <span>CPF INVALIDO</span>
            )}
            <button onClick={() => {
              if(identificador.length == 11){
                setAviso(0)
                if (validaCpf(identificador)){
                  setMsg(votar(identificador, nome))
                  setShowModal(!showModal)
                  setIdentificador('')
                  setStatusMsg(true)
                } else {
                  setAviso(2)
                }
              } else {
                setAviso(1)
              }
              }} className='modal-button'>VOTAR</button>
              
          </div>
        </section>
      )
    }
    

    </>
  )
}

export default App
