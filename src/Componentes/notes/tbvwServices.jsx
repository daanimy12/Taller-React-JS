import React, { useEffect, useState } from 'react';
import { useNotesAction } from "./contextos/contNotes"
import { TableBody, TableRow, TableCell } from '@material-ui/core';
import useTable from './useTable';



const headCells = [
    { id: '1', label: 'Nombre' },
    { id: '2', label: 'Descripcion' },
    { id: '3', label: 'Importe' },
]
const TbvwServices = () => {
    const { arrayServices } = useNotesAction();
    const { TblContainer, TblHead } = useTable(arrayServices, headCells);


    const handleService = () => {
        if (arrayServices.length === 0) {
            return null;
        } else {
            return (<>
                <h1 className="titleVendor"> Servicios </h1>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            arrayServices.map((item, i) => (
                                <TableRow key={i}>
                                    <TableCell>{item?.Nombre || 0} </TableCell>
                                    <TableCell>{item.Descripcion} </TableCell>
                                    <TableCell>{item?.Precio || 0}</TableCell>
                                </TableRow>
                            )
                            )
                        }
                    </TableBody>
                </TblContainer>
            </>)
        }
    }
    return (
        <>
            {handleService()}
        </>
    )
}

export default TbvwServices;
