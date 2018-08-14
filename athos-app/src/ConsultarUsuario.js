import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import ConsultarUsuarioDescricao from './ConsultarUsuarioDescricao';
import Filtrar from './Filtrar';
import { Link } from "react-router-dom";
var axios = require('axios')



function ValidaCPF(strCPF) {
    var Soma;
    var Resto;
    Soma = 0;
    
  if (strCPF.length != 11) return false;
  if (strCPF == "00000000000") return false;
     
  for (var i=1; i<=9; i++)
  {
    Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
  } 
  Resto = (Soma * 10) % 11;
   
    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;
   
  Soma = 0;
    for (var i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;
   
    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
    return true;
}

class ConsultarUsuario extends React.Component
{
    componentWillMount()
    {
        this.setState({Loading:true});
        var self = this;               
        axios({
            method: 'post',
            url: self.webConfig.apiUrl + '/api/Usuarios/ConsultarUsuario',            
            data: self.state.Usuario,
            headers: {'Authorization': self.webConfig.authorizationToken, 'Content-Type':'application/json'}
        }).then(function (response) {
            console.log(response.data);
            self.setState({
                Loading:false, 
                Usuarios:response.data             
            });
        }).catch(function (error) {            
            alert(error)
            self.setState({
                Loading:false                        
            });
        });
    }

    constructor(props)
    {
        super(props);
        this.state ={            
            Loading:true,
            RedirectURL:{
                Status:false,
                Url:null
            },
            Usuario:{
                Id:0,
                Nome:"",
                SobreNome:"",
                CPF:"",
                Telefone:""
            },
            Usuarios:[]
        }

        this.webConfig = {
            Id:this.props.scriptParam.Id,           
            apiUrl:this.props.scriptParam.apiUrl,
            authorizationToken: this.props.scriptParam.authorizationToken
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
                
    }


    handleChange(event) { 
        
        const target = event.target;
        const name = target.name;
        var value = target.value    
        
        console.log(value)

        this.setState(prevState => ({
            Usuario:{...prevState.Usuario,
                [name]: value
            }
        }));
    }


    handleSubmit(event) { 
        event.preventDefault();
        var self = this;        

        const target = event.target;
        const name = target.name;

        if(name.indexOf("Enviar") != -1)       
        {
            if(this.state.Usuario.CPF.length > 0 && this.state.Usuario.Nome.length >= 20)
                alert("O nome é muito longo") 
            else if(this.state.Usuario.CPF.length > 0 && ValidaCPF(this.state.Usuario.CPF) == false)
                alert("O número de CPF esta Inválido")
            
            else
            {
                if(window.confirm("Desejar confirmar a alteração?"))
                {
                    self.setState({
                        Loading:true
                    });
                    axios({
                        method: 'post',
                        url: self.webConfig.apiUrl + '/api/Usuarios/ConsultarUsuario',            
                        data: self.state.Usuario,
                        headers: {'Authorization': self.webConfig.authorizationToken, 'Content-Type':'application/json'}
                    }).then(function (response) {
                        console.log(response.data);
                        self.setState({
                            Loading:false, 
                            Usuarios:response.data             
                        });
                    }).catch(function (error) {            
                        alert(error)
                        self.setState({
                            Loading:false                        
                        });
                    });
                }
            }
        }
        else if(name.indexOf("Excluir") != -1)       
        {               
            if(window.confirm("Desejar confirmar a alteração?"))
            {
                var idUsuario = name.replace("Excluir", ""); 
                console.log(idUsuario)      
                self.setState({
                    Loading:true
                });
                axios({
                    method: 'post',
                    url: self.webConfig.apiUrl + '/api/Usuarios/DeletarUsuario',            
                    data: {Id:idUsuario},
                    headers: {'Authorization': self.webConfig.authorizationToken, 'Content-Type':'application/json'}
                }).then(function (response) {
                    
                    axios({
                        method: 'post',
                        url: self.webConfig.apiUrl + '/api/Usuarios/ConsultarUsuario',            
                        data: self.state.Usuario,
                        headers: {'Authorization': self.webConfig.authorizationToken, 'Content-Type':'application/json'}
                    }).then(function (response) {
                        console.log(response.data);
                        self.setState({
                            Loading:false, 
                            Usuarios:response.data             
                        });
                    }).catch(function (error) {            
                        alert(error)
                        self.setState({
                            Loading:false                        
                        });
                    });


                }).catch(function (error) {                                       
                    alert(error)
                    self.setState({
                        Loading:false                        
                    });
                });
            }
        }
    }


    /*<ConsultarUsuarioGrid key={options.Id} root_JSON={options} />*/
    render()
    {
        return (
            <div>
                {this.state.Loading?<h1><div className="cssMask"><img src="http://programasaudebemestar.com.br/im/logo.png" className="cssLoader"/></div></h1>:null}             
                {this.state.RedirectURL.Status?<Redirect to={this.state.RedirectURL.Url}/>:""}
                <ConsultarUsuarioDescricao/>
                <Filtrar root_OnChange={this.handleChange} root_OnClick={this.handleSubmit} root_JSON={this.state}/>
                <table className="table table-bordered table-hover">
                    <tbody>
                        <tr>                            
                            <th>Nome</th>                            
                            <th>CPF</th> 
                            <th>Telefone</th>
                            <th className="col-sm-1"><center>Ações</center></th>                           
                        </tr>
                        {this.state.Usuarios.map(options =><tr key={options.Id}><td><Link to={"/AtualizarUsuario/"+ options.Id}>{options.Nome} {options.SobreNome}</Link> </td><td>{options.CPF}</td><td>{options.Telefone}</td><td> <button name={"Excluir" +  options.Id} type="submit" className="btn btn-warning btn-sm" onClick={this.handleSubmit} >Excluir</button></td></tr>)}                        
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ConsultarUsuario