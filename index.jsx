const express = require('express')
const app = express()
const port=process.env.PORT || 5000
const cors=require('cors')

const recipes=require('./data/recipes.json')
const chefRecipes=require('./data/chefRecipes.json')

app.use(cors())
app.get('/', (req,res)=>{
    res.send('hello world')
})

// to load all chef in Home page

app.get('/recipes',(req, res)=>{
    res.send(recipes)
});

app.get('/recipes/:id', (req,res)=>{
    const id=parseInt(req.params.id)
    console.log(id);
    const singleRecipe=recipes.find(n=>n.id===id)
    res.send(singleRecipe)
})

app.get('/chef-recipe',(req, res)=>{
    res.send(chefRecipes)
});
  
// declared route for details page

app.get('/chef-recipe/:id', (req,res)=>{
    const id=parseInt(req.params.id)
    const selectedRecipe=chefRecipes.filter(n=>n.category_id===id) //as multiple recipe
    const selectedChef=recipes.find(n=>n.id===id)
    const responseData = {
        recipe: selectedRecipe,
        chef: selectedChef
    };

    res.send(responseData)
})



app.listen(port, ()=>{
    console.log('server running on port',port)
})