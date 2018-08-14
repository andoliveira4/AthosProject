import React, { Component } from 'react';
//import logo from './Header.png';
import { Link } from "react-router-dom";


class Header extends Component {

  constructor(props)
  {
    super(props);    
  }  


    render() 
    {
      return(        
        <div>
          <div className="row cssCabecalho">  
            <center><br/><br/><br/><img src="http://www.athos.com.br/assets/img/logos/athos2.png"/><br/></center>
          </div>
          <div>
              <nav className="navbar navbar-inverse">
                  <div className="container-fluid">
                      <ul className="nav navbar-nav"> 
                        <li><b>|</b></li>          
                        <li><Link to={"/Home/"}>Home</Link></li>       
                        <li><b>|</b></li>      
                        <li><Link to={"/CadastrarUsuario/"}>Cadastrar</Link></li>
                        <li><b>|</b></li>  
                        <li><Link to={"/ConsultarUsuario/"}>Consultar</Link></li>
                        {/*<li><b>||</b></li>  
                        <li><Link to={"/DeletarUsuario/"}>Deletar</Link></li>
                        <li><b>||</b></li>  
                        <li><Link to={"/AtualizarUsuario/"}>Atualizar</Link></li>  */}
                        <li><b>|</b></li>     
                        <li><Link to={"/Construcao/"}>Pagina Inexistente</Link></li>                                     
                        <li><b>|</b></li>  
                        <li><Link to={"/Construcao/"}>Pagina Inexistente</Link></li>                                    
                        <li><b>|</b></li>
                        
                      </ul>
                  </div>
              </nav>
          </div>
        </div>        
      );
    }
  }
  
  export default Header;