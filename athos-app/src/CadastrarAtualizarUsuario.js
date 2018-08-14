import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import CadastrarAtualizarUsuarioDescricao from './CadastrarAtualizarUsuarioDescricao';
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


class CadastrarAtualizarUsuario extends React.Component
{
    constructor(props)
    {
        super(props);

        this.Tipo = 0
        if(this.props.scriptParam.Id != null) //Cadastrar Registro
            this.Tipo = this.props.scriptParam.Id

        this.state ={
            Loading:true,
            RedirectURL:{
                Status:false,
                Url:null
            },
            Usuario:{
                Id:this.Tipo,
                Nome:"",
                SobreNome:"",
                CPF:"",
                Telefone:""
            }            
        }

        this.webConfig = {
            Id:this.props.scriptParam.Id,           
            apiUrl:this.props.scriptParam.apiUrl,
            authorizationToken: this.props.scriptParam.authorizationToken
          }
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount()
    {
        if(this.Tipo== 0) //Cadastra
        {
            this.setState({
                Loading:false
            });
        }
        else //Atualiza
        {
            this.setState({Loading:true});
            var self = this;               
            axios({
                method: 'post',
                url: self.webConfig.apiUrl + '/api/Usuarios/CarregaUsuario',            
                data: self.state.Usuario,
                headers: {'Authorization': self.webConfig.authorizationToken, 'Content-Type':'application/json'}
            }).then(function (response) {
                //console.log(response.data);
                self.setState({
                    Loading:false,
                    Usuario:{
                        Id:response.data.Id,
                        Nome:response.data.Nome,
                        SobreNome:response.data.SobreNome,
                        CPF:response.data.CPF,
                        Telefone:response.data.Telefone
                    }                    
                });
            }).catch(function (error) {            
                alert(error)
                self.setState({
                    Loading:false                        
                });
            });
        }        
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

        if(name === "Enviar")       
        {   
            var regTelefone = new RegExp('/^[0-9]*$/')
            if(!this.state.Usuario.Nome || !this.state.Usuario.SobreNome || !this.state.Usuario.CPF || !this.state.Usuario.Telefone)
                alert("Preencha todos os campos pra continuar")            
            else if(this.state.Usuario.Nome.length >= 20)
                alert("O nome é muito longo")            
            else if(this.state.Usuario.SobreNome.length >= 150)
                alert("O Sobrenome é muito longo")            
            else if(ValidaCPF(this.state.Usuario.CPF) == false)
                alert("O número de CPF esta Inválido")
            else if(regTelefone.test(this.state.Usuario.Telefone) || this.state.Usuario.Telefone.length < 8 || this.state.Usuario.Telefone.length >= 16)
                alert("O número de Telefone esta Inválido")
            else
            {
                if(window.confirm("Desejar confirmar a alteração?"))
                {
                    this.setState({
                        Loading:true
                    }); 
                    
                    if(self.Tipo == 0)
                        var strURL = '/api/Usuarios/CadastrarUsuario'
                    else
                        var strURL = '/api/Usuarios/AtualizarUsuario'
                    
                    axios({
                        method: 'post',
                        url: self.webConfig.apiUrl + strURL,            
                        data: self.state.Usuario,
                        headers: {'Authorization': self.webConfig.authorizationToken, 'Content-Type':'application/json'}
                    }).then(function (response) {
                        self.setState({
                            Loading:false,
                            RedirectURL:{
                                Status:true,
                                Url:"/ConsultarUsuario/"                            
                            }
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
    }

    render()
    {
        return (
            <div  className="well">
                {this.state.Loading?<h1><div className="cssMask"><img src="https://cdn.ndtv.com/vp/static/images/preloader.gif" className="cssLoader"/></div></h1>:null}             
                    {this.state.RedirectURL.Status?<Redirect to={this.state.RedirectURL.Url}/>:""}
                <CadastrarAtualizarUsuarioDescricao/>

                <div className="form-group"> 
                    <label >Nome:</label>
                    <input name="Nome" type="text"  placeholder="João" required className="form-control" onChange={this.handleChange} value={this.state.Usuario.Nome} />
                </div>

                <div className="form-group">
                    <label >Sobrenome:</label> 
                    <input name="SobreNome" type="text"  placeholder="da Silva" required className="form-control" onChange={this.handleChange} value={this.state.Usuario.SobreNome} />
                </div>

                <div className="form-group"> 
                    <label >CPF: <span className="cssGray">(Somente Números)</span></label>
                    <input name="CPF" type="number" placeholder="12345678901" required className="form-control" onChange={this.handleChange} value={this.state.Usuario.CPF} />
                </div>
                
                <div className="form-group"> 
                    <label >Telefone: <span className="cssGray">(Somente Números)</span></label>
                    <input name="Telefone" type="number" placeholder="99999999" required className="form-control" onChange={this.handleChange} value={this.state.Usuario.Telefone} />
                </div>
                <div className="form-group">
                    <button name="Enviar" type="submit" className="btn btn-success" onClick={this.handleSubmit} >Enviar alteração</button>
                </div>                
            </div>
        )
    }
}

export default CadastrarAtualizarUsuario