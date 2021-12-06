var mongoose = require('mongoose')

var options = {
    connectTimeoutMS: 5000,
    useUnifiedTopology: true,
    useNewUrlParser: true
}

mongoose.connect('mongodb+srv://admin:admin@cluster0.ycj2n.mongodb.net/sportbuddy?retryWrites=true&w=majority',
    options,
    function(err){
        if (err){
            console.log("ERREUR DE CONNECTION",err)
            return;
        }
        console.log("BD CONNECTION REUSSIE")
        
    }
)

module.exports = mongoose