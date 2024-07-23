// Importar modulos necesarios
const express = require("express");
const app = express();
const mysql2 = require("mysql2");
const cors = require("cors");
// Habilitar software CORS
app.use(cors());
// Añadir la entrada JSON requests
app.use(express.json());

// Crear conexion a MYSQL
const db = mysql2.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"control"
});

app.post("/create",(req,res)=>{
    // Obtén los valores del cuerpo de la solicitud
    const cedula = req.body.cedula;
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const correo = req.body.correo;
    const telefono = req.body.telefono;

    // consulta de inserción en la tabla “clientes” de tu base de datos
    db.query('INSERT INTO clientes(cedula,nombre,apellido,correo,telefono) VALUES(?,?,?,?,?)',[cedula,nombre,apellido,correo,telefono],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});

// Realiza una consulta para seleccionar todos los registros de la tabla "clientes"
app.get("/clientes",(req,res)=>{
    db.query('SELECT * FROM clientes',
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});

// Lógica para actualizar registros en la base de datos
app.put("/update",(req,res)=>{
    const idClientes = req.body.idClientes;
    const cedula = req.body.cedula;
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const correo = req.body.correo;
    const telefono = req.body.telefono;

    // consulta de actualización en la tabla “clientes” de tu base de datos
    db.query('UPDATE clientes SET cedula=?,nombre=?,apellido=?,correo=?,telefono=? WHERE idClientes=?',[cedula,nombre,apellido,correo,telefono,idClientes],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});

// Lógica para eliminar un registro de la base de datos
app.delete("/delete/:idClientes",(req,res)=>{
    const idClientes = req.params.idClientes;

    // consulta de eliminacion en la tabla “clientes” de tu base de datos
    db.query('DELETE FROM clientes WHERE idClientes=?',idClientes,
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});

app.listen(3001,()=>{
    console.log("Corriendo en el puerto 3001")
})