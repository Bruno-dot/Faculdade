//Faz a importações

import React, { useState, useEffect } from 'react';
import './styles.css';


//Recarrega os registros salvos
function App() {


     const [Registros, setRegistros] = useState(() => {
    const savedRegistros = localStorage.getItem('Registros');
    return savedRegistros ? JSON.parse(savedRegistros) : [];

  });


  const [nome, setNome] = useState('');
  const [data, setData] = useState('');
  const [valor, setValor] = useState('');


  //Salva os registro
  useEffect(() => {

    localStorage.setItem('Registros', JSON.stringify(Registros));

  }, [Registros]);


  //Adiciona um registro
  const adicionarRegistro = (e) => {

        e.preventDefault();


        const dataHoje = new Date().toISOString().split('T')[0]; // Obtém a data de hoje no formato YYYY-MM-DD


        if (nome && data && valor) {

        if (data > dataHoje) { // Verifica se a data é posterior à data de hoje
            alert('Não é permitido inserir Registros com data futura.');
            return;

        }

        const novoRegistro = { nome, data, valor: parseFloat(valor) };


        setRegistros([...Registros, novoRegistro]);
        setNome('');
        setData('');
        setValor('');

        }

  };

  
  //Faz a soma de todos os registros
  const totalRegistro = Registros.reduce((total, Registro) => total + Registro.valor, 0);


//Remove um registro
  const removerRegistro = (index) => {

    const novosRegistros = Registros.filter((_, i) => i !== index);
    setRegistros(novosRegistros);

  };



  //Retorna tudo em html
  return (

    <div className="App">

      <div className="container"> {/* Envolvemos o conteúdo com a classe 'container' */}


        <h1>Controle de Registros</h1>


        <form onSubmit={adicionarRegistro}>

          <div>

            <label>Nome:</label>

            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex: RU"
            />

          </div>


          <div>

            <label>Data:</label>
            
            <input
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
            />

          </div>


          <div>

            <label>Valor:</label>

            <input
              type="number"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              placeholder="Ex: 3.00"
            />

          </div>


          <button type="submit">Adicionar Registro</button>


        </form>


        <h2>Lista de Registros</h2>

        <ul>

          {Registros.map((Registro, index) => (

            <li key={index}>

              {Registro.nome} - {Registro.data} - R$ {Registro.valor.toFixed(2)}
              <button onClick={() => removerRegistro(index)}>Remover</button>

            </li>

          ))}

        </ul>


        <h3>Total Registro: R$ {totalRegistro.toFixed(2)}</h3>

      </div>


    </div>


  );
}

export default App;
