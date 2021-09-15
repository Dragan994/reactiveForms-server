const express = require('express');
const {readFile, writeFile} = require('fs');
const app = express();
const port = process.env.PORT || 3000;
const publicUrl = __dirname + '/public'
const usersUrl = __dirname + '/users.json'
app.use(express.json());



// Get data from server
app.get('/', (req, res)=>{
    res.sendFile( publicUrl +'/index.html')
    console.log('Served index.html')
});
app.get('/login', (req, res)=>{
    res.sendFile(publicUrl + '/index.html')
    console.log('Served index.html')
})
app.get('/user-profile', (req, res)=> {
    res.sendFile(publicUrl + '/index.html')
})
app.get('/register', (req, res)=> {
    res.sendFile(publicUrl + '/index.html')
})
app.get('/styles.css', (req, res)=>{
    res.sendFile(publicUrl + '/styles.css');
})
app.get('/main.js',(req, res) => {
    res.sendFile(publicUrl + '/main.js')
})
app.get('/polyfills.js', (req, res)=>{
    res.sendFile(publicUrl + '/polyfills.js')
})
app.get('/runtime.js', (req, res)=>{
    res.sendFile(publicUrl + '/runtime.js')
})


app.get('/user-profile/:id', (req, res) => {
    const id = req.params.id

    readFile(usersUrl, 'utf-8', (err, data)=>{   
        const users = JSON.parse(data)
        for(let user of users){
            if(user.id === id){
                res.send(user);
                break;
            }
        }
        if(err)res.send(err)
    })


});


app.post('/login', (req, res)=>{
    const{email, password} = req.body

    let userFound=false
    readFile(usersUrl, 'utf-8', (err, data)=>{
        let users = JSON.parse(data);
        let response;
            for(let user of users){
                if(user.email === email){
                    if(user.password === password){
                        response = user;
                        console.log('User Logged in Succesfully!')
                        break;
                    }                    
                    else {
                        response = {message: 'Wrong password!'};
                        console.log('Wrong password!')
                        break;
                    }
                }
                else { response ={message: 'User does not exist!'} }
            }  
        res.send(response)
            
        });

    console.log('Login got',req.body)
});

app.post('/register', (req, res)=>{
    readFile(usersUrl, 'utf-8', (err, data)=>{
        if(err)res.send(err);
        let json = JSON.parse(data);
        json.push(req.body);
        
        
        writeFile('users.json',JSON.stringify(json),(err)=>{
            if(err)console.log(err)
        });
        
        res.send({message:'User created succesfully!',user: req.body});
    })


    console.log('Register got',req.body);
});



app.listen(port, () => { console.log(`Listening on port:${port}...`) });