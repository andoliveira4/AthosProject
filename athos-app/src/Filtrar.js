import React, { Component } from 'react';


const Filtrar = (props) => {
	return (
    <div>
        <div className="form-horizontal">
            <div className="form-group well ">
            {console.log(props.root_JSON.Usuario)}
            {console.log(props.root_JSON.Usuario)}
                <div className="col-sm-5"><input name="Nome" type="text" className="form-control" placeholder="Digite o Nome desejado" onChange={props.root_OnChange} value={props.root_JSON.Usuario.Nome}  /></div>
                <div className="col-sm-5"><input name="CPF" type="number" className="form-control" placeholder="Digite o CPF desejado" onChange={props.root_OnChange} value={props.root_JSON.Usuario.CPF}  /></div>
                <div className="col-sm-2"><input name="Enviar" type="submit" className="btn btn-info btn-block" onClick={props.root_OnClick}  value="Procurar" /></div>
            </div>
            {/*<div className="">               
                    <div className="col-sm-10"><input name="SearchText" type="checkbox" checked={props.root_JSON.SearchBodyText} onChange={props.root_OnChange} /> Procurar na descrição do sintoma</div>
                    <div className="col-sm-2"></div>
                </div>-->*/}
        </div>
    </div>
  );
}



export default Filtrar;