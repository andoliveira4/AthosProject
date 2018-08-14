import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Header from './Header';
import CadastrarAtualizarUsuario from './CadastrarAtualizarUsuario';
import Home from './Home';
import ConsultarUsuario from './ConsultarUsuario';
import Construcao from './Construcao';

import { HashRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";
import registerServiceWorker from './registerServiceWorker';

const varAPI = "http://localhost:53426"
const varAuthorizationToken = "SGVhbHRod2F5cyBEZXY6MEFPRkVYa0NZRl9GQlFU"


class AppHome extends React.Component{
    constructor(props)
    {        
        super(props);                
    }
    render() {
        return(
            <div>
                <Header scriptParam={this.state} /> 
                
                <div className="container">
                    <div className="row">    
                        <div className="col-sm-1"></div>
                        <div className="col-sm-10">                                                    
                            <div className="row">                             
                                <center><img src="https://www.riotgames.com/darkroom/1440/b8e42e6519e7a8ad386549c7dc1c6d12:04256fd0494bb434da141d700b4bd158/sp-city01.jpg" height = "500"/></center>               
                                <br/><br/>                               
                                <Home/>
                            </div>
                        </div>
                        <div className="col-sm-1"></div>                           
                    </div>                
                </div>
            </div>
        )
    }
}


class AppConstrucao extends React.Component{
    constructor(props)
    {        
        super(props);                
    }
    render() {
        return(
            <div>
                <Header scriptParam={this.state} />                
                <div className="container">
                    <div className="row">    
                        <div className="col-sm-1"></div>
                        <div className="col-sm-10">                                                    
                            <div className="row">                                
                                <Construcao/>
                            </div>
                        </div>
                        <div className="col-sm-1"></div>                           
                    </div>                
                </div>
            </div>
        )
    }
}

class AppCadastrarAtualizarUsuario extends React.Component{
    constructor(props)
    {        
        super(props); 
        this.state = {
            Id:this.props.match.params.Id,  
            apiUrl:varAPI,            
            authorizationToken:varAuthorizationToken,  
        }
    }  
    
    render() {
        return(
            <div>
                <Header scriptParam={this.state} />
                <div className="container">
                    <div className="row"> 
                    <div className="col-sm-1"></div>                       
                        <div className="col-sm-10">                                                    
                            <div className="row">                                
                                <CadastrarAtualizarUsuario scriptParam={this.state} />
                            </div>
                        </div>                        
                    </div>     
                    <div className="col-sm-1"></div>           
                </div>
            </div>
        );
    }
}

class AppConsultarUsuario extends React.Component{
    constructor(props)
    {        
        super(props); 
        this.state = {
            Id:this.props.match.params.Id,  
            apiUrl:varAPI,            
            authorizationToken:varAuthorizationToken,  
        }              
    }
    render() {
        return(
            <div>
                <Header scriptParam={this.state} />
                <div className="container">
                    <div className="row"> 
                    <div className="col-sm-1"></div>                       
                        <div className="col-sm-10">                                                    
                            <div className="row">                                
                                <ConsultarUsuario scriptParam={this.state} />
                            </div>
                        </div>                        
                    </div>     
                    <div className="col-sm-1"></div>           
                </div>
            </div>
        )
    }
}

class AppDeletarUsuario extends React.Component{
    constructor(props)
    {        
        super(props); 
        this.state = {
            Id:this.props.match.params.Id,  
            apiUrl:varAPI,            
            authorizationToken:varAuthorizationToken,  
        }                
    }
    render() {
        return(
            <div>
                <Header scriptParam={this.state} />
            </div>
        )
    }
}

ReactDOM.render(    
    <Router >
        <div>
            <Switch>
                <Route exact={true} path="/" component={AppHome} />                
                <Route path="/home/" component={AppHome} />
                <Route path="/Construcao/" component={AppConstrucao} />
                <Route path="/CadastrarUsuario/" component={AppCadastrarAtualizarUsuario} />
                <Route path="/ConsultarUsuario/" component={AppConsultarUsuario} />
                <Route path="/DeletarUsuario/:Id" component={AppDeletarUsuario} />
                <Route path="/AtualizarUsuario/:Id" component={AppCadastrarAtualizarUsuario} />                
            </Switch>
        </div>
    </Router>    
    , document.getElementById('root')
);
//ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
