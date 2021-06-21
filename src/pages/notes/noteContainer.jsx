import React from "react";
import styled from "styled-components";
import { colorPalette } from "../../system/styles/styles";
import {PropTypes} from 'prop-types';
import TabsNotes from "../../Componentes/notes/tabNotes";

const MainNote = styled.main`
  header {
    font-family: ${colorPalette.fontMain};
    font-size: 24px;
    margin: 10px 0 0 10px;
  }
  section {
    font-family: ${colorPalette.fontMain};
    display: grid;
    grid-template-columns: 40% 60%;
    width: 100%;
    height: calc(100vh - 50px);
    article {
      background-color: ${colorPalette.white};
      width: 90%;
      height: 85vh;
      overflow: auto;
      border-radius: 10px;
      margin: auto;
      box-shadow: ${colorPalette.boxShadowLigth};
      display: flex;
      flex-direction: column;
      gap: 15px;
    }
  }
`;

const NoteContainer = (props) => {
    const [countStep,setCountStep] = React.useState(0);
    const onChangeCountStep = (e,value) => setCountStep(value);
    return (
        <MainNote>
            <header> Nota de Remición </header>
            <section>
                <article>
                    <TabsNotes handleChange={onChangeCountStep} countStep={countStep} />
                </article>
                <article>
                    aki va la vista previa
                </article>
            </section>
        </MainNote>
    )
}

NoteContainer.propTypes = {
}

NoteContainer.defaultProps = {
}

export default NoteContainer;