'use strict'

//Cargando Modulos
var express = require('express'); 			//Express
var mongoose = require('mongoose'); 			//Mongoose: Base de datos
var hbs = require('express-handlebars');		//Handelbars para paginas dinamicas
var nodemailer = require('nodemailer');			//Nodemailer: Envio de Mails
var app = express();
app.engine('.hbs', hbs({extname: '.hbs'}));		//Extencion de handelbars		
app.set('view engine', '.hbs');				
app.use('/', express.static('Web-g2'));         	//Pagina estaticas
app.use(express.urlencoded({extended: true}));
app.use(express.json());				//JSON
var cors = require('cors');				//CORS
app.use(cors({
    credentials: true,
    origin: ['http://localhost:4200']
}));
var session = require ("express-session");		//Sesion
app.use(session({
           secret:'53CR37',				//palabra con la que se crea el hash
           resave:true,
           saveUninitialized:true,
            cookie:{
            secure:false,
           httpOnly:false,
            }
        }));
//Conexion con la base de datos
try {
    mongoose.connect('mongodb://localhost/Diario', {useNewUrlParser: true, useUnifiedTopology: true}); 
    console.log("conexion de la base de datos, exitosa");
}
catch(err) {
    console.log("no me pude comunicar con la base de datos");
}

const Schema = mongoose.Schema;
const schema = {
    registro: new Schema({
        nombre: {type: String},
        fecha: {type: Date},
        mensaje: {type: String},
	opcion: {type: String},
    }, {collection:'descargos'}),

    usuario: new Schema({
        nombreUsuario: {type: String},
        password: {type: String},
    }, {collection:'usuario'}),

    mensaje: new Schema({
        nombre: {type: String},
        apellido: {type: String},
        mail: {type: String},
        mensaje: {type: String},
    },{collection: 'mensaje'}) 
};

const models = {
    Descargo: mongoose.model('descargos', schema.registro),
    Usuario: mongoose.model('usuario', schema.usuario),
    Mensaje: mongoose.model('mensaje', schema.mensaje)
};

app.post('/api/crearusuario', async function (req, res) {
								var result = null;
    								var unUser = null;
								unUser = new models.Usuario({
            										nombreUsuario : req.body.nombreUsuario,
            										password: req.body.password});


        							result = await unUser.save();
								res.json(result);
							});

//LOGIN
app.post('/api/login', async function (req,res){
	var result=null;
	try{
		result = await models.Usuario.findOne({'nombreUsuario': req.body.nombreUsuario, 'password': req.body.password});
		if(result) {
                	req.session.usuarioId = result._id;
                	res.send({status: 'ok'});
            		}
            	else {
                	res.status(401).send({status: 'error'});
            		}
		}
	catch(error){
			res.status(500).send("error"+error);
			}
});
//Guardar Descargo
app.post('/api/descargo', async function(req, res){
//Verifica Sesion	
	if(!req.session.usuarioId) {
        				res.status(403).send();
        				return;
    					}
    var resultado = null;
    var unaEntrada = null;
//Verifica campos para guardar
    try {
	var error = [];
	if (!req.body.nombre || req.body.nombre && req.body.nombre == ' ') {
          res.status(400).json({
                "status": "error","validations": [{"field": "nombre", "message": "es vacio", "code": "required"}]})
	  return;
	}
	if (!req.body.fecha || req.body.fecha && req.body.fecha == ' ') {
          res.status(400).json({
                "status": "error","validations": [{"field": "fecha", "message": "es vacio", "code": "required"}]})
	  return;
	}
	if (!req.body.mensaje || req.body.mensaje && req.body.mensaje == ' ') {
          res.status(400).json({
                "status": "error","validations": [{"field": "mensaje", "message": "es vacio", "code": "required"}]})
	  return;
     	}
	if (!req.body.opcion || req.body.opcion && req.body.opcion == '0') {
          res.status(400).json({
                "status": "error","validations": [{"field": "opcion", "message": "es vacio", "code": "required"}]})
	  return;
     	}
//Guarda en la base de datos       
        unaEntrada = new models.Descargo({
            nombre: req.body.nombre,
            fecha: req.body.fecha,
            mensaje: req.body.mensaje,
	    opcion: req.body.opcion,
        });
        resultado = await unaEntrada.save();

        res.json(resultado);
    }
    catch(error) {
        res.send("estos son los errores que hubo: " + error);
    }   
});
//Descarga de la base de datos los campos
app.get('/api/descargo', async function(req, res){
	if(!req.session.usuarioId) {
        				res.status(403).send();
        				return;
    					}
    var resultado = null;
    try {
        resultado = await models.Descargo.find();
        res.json(resultado);
    }
    catch(error) {
        res.send("estos son los errores que hubo: " + error);
    }
});
//Buscar entradas por fecha
app.get('/api/registro/:fecha', async function(req, res){
    var resultado = null;
    try {
        resultado = await models.Descargo.findOne({'fecha':req.params.fecha});
        res.json(resultado);
    }
    catch(error) {
        res.send("estos son los errores que hubo: " + error);
    }
});
//Busca entradas por ID
app.get('/api/registro/id/:id', async function(req, res){
    var resultado = null;
    try {
        resultado = await models.Descargo.findById(req.params.id);
        res.json(resultado);
    }
    catch(error) {
        res.send("estos son los errores que hubo: " + error);
    }
});
//Borrar entrada
app.delete('/api/registro/:id', async function(req, res){
    var resultado = null;
    try {
        resultado = await models.Descargo.deleteOne({'_id':req.params.id});
        res.json(resultado);
    }
    catch(error) {
        res.send("estos son los errores que hubo: " + error);
    }
});
//CONTACTO
app.get('/contacto', function(req, res){
  res.render('formulario', {tipoFormulario: ''});
});
app.post('/contacto', async function(req, res) {
  try {
//Verifica los campos 
      var error = [];
      if (!req.body.nombre || req.body.nombre && req.body.nombre == ' ') {
          error.push('El nombre es obligatorio');
      }
      if (!req.body.apellido || req.body.apellido && req.body.apellido == ' ') {
          error.push('El apellido es obligatorio');
      }
      if (!req.body.mail || req.body.mail && req.body.mail == ' ') {
          error.push('El e-mail es obligatorio');
      }
      if (!req.body.mensaje || req.body.mensaje && req.body.mensaje == ' ') {
          error.push('Debes enviarme algun mensaje!');
      }
      if (error.length > 0) {
          res.render('formulario', {error: error}) 
          return;
      }
//Crea variable para nodemailer
      var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
              user: 'usermail',
              pass: 'mailpassword'
          } 
      });

      let info = await transporter.sendMail({
          from: '"'+req.body.nombre+' '+req.body.apellido+'" <'+req.body.mail+'>',
          to: 'usermail@gmail.com, '+req.body.mail,
          subject: 'Nuevo mensaje proveniente del sitio web',
          text: req.body.mensaje, 
          html: '<p>'+req.body.mensaje+'</p>' 
      });

     
      var result = null;
      var unMensaje = null;
      unMensaje = new models.Mensaje({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        mail: req.body.mail,
        mensaje: req.body.mensaje
      });
//Manda el email
      result = await unMensaje.save(); 
      res.render('mensajeEnviado', {info: result.nombre, apellido: result.apellido });
  }
  catch(err) {
      res.render('formulario', {error: err});
  }
});
app.listen(3000);
    console.log("Escuchando en el 3000");
