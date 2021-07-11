import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { colorPalette } from "../../system/styles/styles";
import { NotificationManager } from "react-notifications";

const inicialValuesF = {
  folio: '',
  names: '',
  amount: 0,
  price: 0,
  description: '',
  photo: null,
  img: null,
  photoP: null,
  Type: 'herramienta',
}

const Form = (props) => {
  const { inventoryEdit, addOrEdit } = props;
  const [state, setState] = useState(inicialValuesF);

  const onChangeInput = ({ target }) => {
    const { name, value } = target;
    setState(prev => ({
      ...prev,
      [name]: value,
    }
    ));
  };

  const resetForm = () => {
    setState({ ...inicialValuesF });
  }
  const cancel = () => {
    resetForm();
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    addOrEdit(state, resetForm);
  };

  const imageHandler = (e) => {
    const reader = new FileReader();
    const photo = e.target.files[0];
    try {
      reader.onload = () => {
        if (reader.readyState === 2) {
          setState(prev => ({
            ...prev,
            photoP: reader.result,
            photo,
          }));
        }
      };
      reader.readAsDataURL(e.target.files[0])
    } catch (error) {
      NotificationManager.error('Ocurrió un error: Faltan datos');
    }
  };

  useEffect(() => {
    if (inventoryEdit != null) {
      setState({
        ...inventoryEdit,
      });
    }
  }, [inventoryEdit])

  return (
    <form className="boxMain" onSubmit={handleSubmit}>
      <h2> Datos herramienta / refacción </h2>
      <div className="boxInput" >
        <label> Folio: </label>
        <input
          name="folio"
          value={state.folio}
          onChange={onChangeInput}
          required
        // readOnly
        />
      </div>
      <div className="boxInput" >
        <label> Nombre: </label>
        <input
          name="names"
          value={state.names}
          onChange={onChangeInput}
          required
        />
      </div>
      <div className="boxInput" >
        <label> Cantidad: </label>
        <input
          type="number"
          min="0"
          name="amount"
          value={state.amount}
          onChange={onChangeInput}
          required
        />
      </div>
      <div className="boxInput" >
        <label> Precio: </label>
        <input
          type="number"
          min="0"
          name="price"
          value={state.price}
          onChange={onChangeInput}
          required
        />
      </div>
      <div className="boxInput" >
        <label> Descripción: </label>
        <input
          name="description"
          value={state.description}
          onChange={onChangeInput}
          required
        />
      </div>
      <div className="typeUser" >
        <div>
          <input
            type="radio"
            id="customRadio1"
            name='Type'
            checked={state.Type === 'herramienta'}
            onChange={onChangeInput}
            value="herramienta"
          />
          <label htmlFor="customRadio1"> Herramienta </label>
        </div>
        <div>
          <input
            type="radio"
            id="customRadio2"
            name='Type'
            checked={state.Type === 'refaccion'}
            onChange={onChangeInput}
            value="refaccion"
          />
          <label htmlFor="customRadio2"> Refacción </label>
        </div>
      </div>
      <div className="boxInput" >
        <label> Imagen: </label>
        <input
          name="photo"
          onChange={imageHandler}
          accept="image/*"
          id="icon-button-file"
          type="file"
          required
        />
      </div>
      <div className="boxInput" >
        {
          <img src={state.photoP} alt="Imagen" id="myimg" style={{ width: 300, height: 185 }} />
        }
      </div>
      <div className="boxAction">
        <button
          type="submit"
          className="save"
        >
          Aceptar
        </button>
        <button
          type="button"
          // onClick={deleteUser}
          className="delete"
        >
          Desactivar
        </button>
        <button
          type="button"
          onClick={cancel}
          className="cancel">
          Cancelar
        </button>
      </div>
    </form>
  )
};


export default styled(Form)`
    main {
      
    }
`;
