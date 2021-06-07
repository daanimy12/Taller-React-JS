import React from 'react';import styled from "styled-components";import { Users, CashRegister } from "@styled-icons/fa-solid";import { CustomerService2 } from "@styled-icons/remix-line";import { Inventory } from "@styled-icons/material-outlined";import { Settings } from "@styled-icons/fluentui-system-filled";import { Offer, Report, Exit } from "@styled-icons/boxicons-solid";import { BurstSale } from "@styled-icons/foundation";import { Table } from "@styled-icons/boxicons-regular";import Login from '../../Helpers/Login';import { useHistory } from "react-router-dom";import {colorPalette} from "../../system/styles/styles";const NavBar = (props) => {    const [state, setState] = React.useState(        {            Areas: [],            listaFinal: null,            Stilo: 'ulInicial',            Clase1: 'none',            Clase2: 'none',            Clase3: 'none'        });    const { Cliente, className } = props;    const history = useHistory();    const cambio = (e) => {        history.push('/Customers/'+[e.target.id]);        window.location.reload();    };    const salir = () => {        // Eliminacion de token //        history.push('/');        Login.Eliminar();        window.location.reload();    };    const menuB= () => {        if(state.Stilo === 'ulInicial'){            setState(prev => ({...prev,Stilo:'ulInicial1'}));        }else{            setState(prev=>({...prev,Stilo:'ulInicial'}))        }    }    const Menu =  (Cliente === "Administrador") ?        <ul className={state.Stilo}>            <li>                <label id='Clientes' onClick={cambio}>                    <CustomerService2 className="iconNavBar" />                    Clientes                </label>            </li>            <li>                <label id='Usuarios' onClick={cambio}>                    <Users className="iconNavBar" />                    Usuarios                </label>            </li>            <li>                <label id='Inventario/AgregarProduc' onClick={cambio}>                    <Inventory className="iconNavBar" />                    Inventario                </label>            </li>            <li>                <label id='Ofertas' onClick={cambio}>                    <Offer className="iconNavBar" />                    Ofertas                </label>            </li>            <li>                <label id='Venta_Directa' onClick={cambio}>                    <BurstSale className="iconNavBar" />                    Venta Directa                </label>            </li>            <li>                <label id='Venta' onClick={cambio}>                    <Table className="iconNavBar" />                    Mesas                </label>            </li>            <li>                <label id='Reportes' onClick={cambio}>                    <Report className="iconNavBar" />                    Reportes                </label>            </li>            <li>                <label id='Limites' onClick={cambio}>                    <Settings className="iconNavBar" />                    Configuración                </label>            </li>            <li>                <label id='Cierre_de_Caja/Dashboard' onClick={cambio}>                    <CashRegister className="iconNavBar" />                    Cierre de Caja                </label>            </li>            <li>                <label onClick={salir} >                    <Exit className="iconNavBar" />                    Salir                </label>            </li>        </ul> :        <ul className={state.Stilo}>            <li>                <label id='Inventario/AgregarProduc' onClick={cambio}>                    Inventario                </label>            </li>            <li>                <label id='Venta_Directa' onClick={cambio}>                    Venta Directa                </label>            </li>            <li>                <label id='Venta' onClick={cambio}>                    Mesas                </label>            </li>            <li>                <label onClick={salir} >                    Salir                </label>            </li>        </ul>;    return (        <main className={className}>            <nav                id="menu"            >                <img src="https://i.pinimg.com/originals/97/95/eb/9795ebef9b85576509c37dfce0c8aed8.jpg"  alt="Logo de la company" />                {Menu}            </nav>        </main>    );}export default styled(NavBar)`  width: 100%;  height: 100%;  padding: 10px;  background-color: ${colorPalette.white};    nav {    display: flex;    flex-direction: column;    gap: 10px;    img {      width: 100px;      height: 100px;      border-radius: 50%;      object-fit: cover;      object-position: center;      margin: 0 auto;    }        ul {      margin-top: 15px;      li {        list-style: none;        padding: 15px;        font-family: ${colorPalette.fontMain};        font-size: 18px;        letter-spacing: 0.5px;        color: ${colorPalette.thirdColor};        label {          display: flex;          gap: 10px;          cursor: pointer;        }        .iconNavBar {          width: 20px;        }      }    }  }`;