import React, { createContext } from 'react';
import Universal from "../../../Helpers/Universal";
import moment from "moment";
import ReducerNotes from "./reducerNotes";
import { NotificationManager } from "react-notifications";
const NotesContext = createContext();

const NotesState = (props) => {
    const { children } = props;
    const [inventary, setInventary] = React.useState(
        []
    );
    // array de los datos de provedores de la nota
    const [arrayVendors, setArrayVendors] = React.useState([]);
    // array de los servicios de provedores de la nota
    const [arrayServices, setArrayServices] = React.useState([]);
    const [stateLocal, setState] = React.useState(
        {
            folio: "",
            name: "",
            direction: "",
            modelCar: "",
            brand: "",
            licensePlate: "",
            createdAt: `${moment().format("YYYY-MM-DD")}`,
            lastName: "",
            total: 0,
            customer: "",
            advance: "",
        }
    );
    const [state, dispatch] = React.useReducer(ReducerNotes, stateLocal);
    const [arrayCustomers, setArrayCustomers] = React.useState([]);
    const [saveClic, setSaveClic] = React.useState(true);
    const onClear = () => {
        setState(
            {
                name: "",
                direction: "",
                modelCar: "",
                brand: "",
                licensePlate: "",
                createdAt: `${moment().format("YYYY-MM-DD")}`,
                lastName: "",
                total: 0,
                customer: ""
            }
        )
    }

    const onFolio = () => {
        const data = `SAuto-${Math.floor(Math.random() * 999999)}`;
        setState( prev => ({ ...prev, folio: data }));
    }

    const loadCustomers = async () => {
        const customers = await Universal.ConsultaUniversal('Clientes');
        setArrayCustomers(customers);
    }

    const onSelectCustomer = (id) => {
        const findData = arrayCustomers?.find( (customer) => customer?.invoice === id );
        if(findData) {
            const {
                name,
                lastName,
                brand,
                modelCar,
                direction
            } =  findData;
            setState(
                (prev) => (
                    {
                        ...prev,
                        name,
                        lastName,
                        brand,
                        modelCar,
                        direction
                    }
                )
            )
        } else {
            onClear();
        }

    }

    const onChangeInput = ({ target }) => {
        const { name, value } = target;
        if(name === "customer") onSelectCustomer(value)
        setState( prev => ({ ...prev, [name]: value }));
    }
    const loadData = async  () => {
        const items = await Universal.ConsultaUniversal('Inventario');
        setInventary(items);
    }

    React.useEffect(
        () => {
            onFolio();
            loadCustomers().then();
            loadData().then();
        }, []
    );

    const updateTotal = () => {
        let total = 0;

        let totalInventary = 0;
        inventary?.filter((inv) => inv.count > 0)?.
            forEach(arr => totalInventary += (+arr?.price * arr?.count)
            );

        let totalService = 0;
        arrayServices.forEach(item => totalService += +item.Precio);

        total = totalInventary + totalService
        setState(
            prev => (
                {
                    ...prev,
                    total
                }
            )
        )
    }
    React.useEffect(
        () => {
            updateTotal();
        }, [arrayServices, inventary]
    )

    const onChangeInputSelect = ({ target }, id) => {
        const { value } = target;
        if(value < 0) {
            NotificationManager.error("No se aceptan datos negativos")
        }else {
            const inventaryLocal = inventary.map((inventa,idx) => ( { ...inventa, idx } ) )
            /*Regresa el item que tiene el mismo id al id seleccionado*/
            const findArray = inventaryLocal.find((inve) => inve.Key === id);
            findArray.count = value;
            /*Filtra los items que sean diferentes al id seleccionado*/
            const filterArray = inventaryLocal.filter((inve) => inve.Key !== id);

            const arrayFinish = [
                ...filterArray,
                findArray
            ];
            // console.log('debugg ', arrayFinish)
            setInventary(
                arrayFinish.sort((a,b) => a.idx - b.idx)
            );
        }
    }

    const isEmpetyState = (value, comp = '') => {
        return value !== comp;
    }
    const validGeneralLocal =()=>{
        const {
            folio,
            name,
            direction,
            modelCar,
            brand,
            licensePlate,
            lastName,
        } = stateLocal;
        return isEmpetyState(folio)
            && isEmpetyState(name)
            && isEmpetyState(direction)
            && isEmpetyState(modelCar)
            && isEmpetyState(brand)
            && isEmpetyState(licensePlate)
            && isEmpetyState(lastName);

    }

    const onSaveData = async () => {
        try {
            await Universal.PushUniversal("Notes",
                {
                    ...stateLocal,
                    services: arrayServices,
                    vendors: arrayVendors,
                    inventary: inventary
                        ?.filter((inv) => inv.count > 0)
                });
            NotificationManager.success('Nota Guardada con exito.')
        } catch (e) {
            console.error(e)
        }
    }

    const value = {
        inventary,
        stateLocal,
        arrayCustomers,
        arrayServices,
        arrayVendors,
        saveClic,
        onClear,
        onFolio,
        loadCustomers,
        onChangeInput,
        onSelectCustomer,
        onChangeInputSelect,
        setArrayServices,
        setArrayVendors,
        setState,
        validGeneralLocal,
        setSaveClic,
        onSaveData
    }
    return (
        <NotesContext.Provider
            value={value}
        >
            {children}
        </NotesContext.Provider>
    )
}
NotesState.propTypes = {

}
NotesState.defaultProps = {

}


export const useNotesAction = () => {
    const context = React.useContext(NotesContext);
    if (!context) {
        throw new Error('El provider de las facturas ha fallado')
    }
    return context;
}

export default NotesState;