    //pacotes

const express = require('express')
const app = express();
const mongoose = require("mongoose");
app.use(express.json());

    //iniciando banco de dados
    try{

        mongoose.connect('mongodb://localhost:27017/pokedesk_db');
        console.log("conexao realizada com sucesso")

    }catch(err){

        console.log("Error:")
        console.log(err)
        
    }

    //lista de tipos
const tiposPokemon = {
    FIRE: 'Fire',
    WATER: 'Water',
    GRASS: 'Grass',
    ELECTRIC: 'Electric',
    ICE: 'Ice',
    FIGHTING: 'Fighting',
    POISON: 'Poison',
    GROUND: 'Ground',
    FLYING: 'Flying',
    PSYCHIC: 'Psychic',
    BUG: 'Bug',
    ROCK: 'Rock',
    GHOST: 'Ghost',
    DARK: 'Dark',
    DRAGON: 'Dragon',
    STEEL: 'Steel',
    FAIRY: 'Fairy',
    NORMAL: 'Normal',
};


    //modelo de pokemon
const Pokedata =  new mongoose.Schema({
   nome:{

        type: String,
        required: true,

   },
   id:{

        type: Number,
        required: true,
        unique: true,

   },
   tipo:{

        type: String,
        enum: Object.values(tiposPokemon),
        required: true,

   },
   imagem:{

        type: String,
        required: true,

   },

});




const Pokemon = mongoose.model('Pokemon', Pokedata);


//validando os tipos de pokemon
const tipoValido = (tipo) => Object.values(tiposPokemon).includes(tipo);



    //inserir pokemons
    app.post('/pokemons', async (req, res) => {
        const { nome, id, tipo} = req.body;
    
        
        if (!nome || !id || !tipo) {
        return res.status(400).json({ message: 'Todos os campos devem estar preenchidos' });
        }
        

        if (!tipoValido(tipo)) {
            return res.status(400).json({ message: 'Tipo de Pokémon inválido.'});
          }


          const imagem = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;


        try {

            const pokemon = new Pokemon({ nome, id, tipo, imagem});
            await pokemon.save();
            res.status(201).json(pokemon);

        } catch (error) {

            res.status(400).json({ message: error.message });

        }
    });

  
    //listar todos os pokemons
    app.get('/pokemons', async (req, res) => {

        try {

        const pokemons = await Pokemon.find();
        res.json(pokemons);

        } catch (error) {

        res.status(500).json({ message: error.message });

        }
    });


    //mostra pokemon especifico
    app.get('/pokemons/:id', async (req, res) => {

        try {

        const pokemon = await Pokemon.findOne({id: req.params.id });
        if (!pokemon) return res.status(404).json({ message: 'Pokémon não encontrado ou invalido' });
        res.json(pokemon);

        } catch (error) {

        res.status(500).json({ message: error.message });

        }
    });


    //edita um pokemon especifico
    app.put('/pokemons/:id', async (req, res) => {
        
        const { tipo, id } = req.body;

        
        if (tipo && !tipoValido(tipo)) {

          return res.status(400).json({ message: 'Tipo de Pokémon inválido.'});

        }
        
        if (numero) {

            req.body.imagem = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

          }

        try {

        const pokemon = await Pokemon.findOneAndUpdate({id: req.params.id }, req.body, { new: true });
        if (!pokemon) return res.status(404).json({ message: 'Pokémon não encontrado' });
        res.json(pokemon);

        } catch (error) {

        res.status(400).json({ message: error.message });
        
        }
    });


    //deleta um pokemon especifico
    app.delete('/pokemons/:id', async (req, res) => {

        try {

        const pokemon = await Pokemon.findOneAndDelete({id: req.params.id });
        if (!pokemon) return res.status(404).json({ message: 'Pokémon não encontrado' });
        res.json({ message: 'Pokémon foi excluído' });

        } catch (error) {

        res.status(500).json({ message: error.message });

        }
    });



    //liga o servidor
const porta = 8010
app.listen(porta , ()=>{
    console.log('Servidor esta rodando na porta 8010')
});