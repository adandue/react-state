import React from "react";

const SECURITY_CODE = 'paradigma'

const UseReducer = ({ name }) => {
    const initialState = {
        value: '',
        error: false,
        loading: false,
        deleted: false,
        confirmed: false
    }

    const [state, dispatch] = React.useReducer(reducer, initialState)

    const onConfirm = () => dispatch({ type: actionTypes.confirm})
    const onError = () => dispatch({ type: actionTypes.error})
    const onCheck = () => dispatch({ type: actionTypes.check})
    const onDelete = () => dispatch({ type: actionTypes.delete})
    const onReset = () => dispatch({ type: actionTypes.reset})

    const onWrite = ({ target: {value} }) => {
        dispatch({ type: actionTypes.write, payload: value})
    }

    React.useEffect(() => {
        console.log('Empezando el efecto')

        if(!!state.loading) {
            setTimeout(() => {
                console.log('Haciendo la validación')
    
                if(state.value === SECURITY_CODE) {
                    onConfirm()
                } else {
                    onError()
                }
    
                console.log('Terminando la validación')
            }, 3000);
        }

        console.log('Terminando el efecto')
    }, [state.loading])

    if(!state.deleted && !state.confirmed) {
        return (
            <div>
                <h2>Eliminar {name}</h2>
                <p>Por favor, escribe el código de seguridad.</p>
                {(state.error && !state.loading) && (
                    <>
                    <p>Error: El código es incorrecto</p>
                    <p>Vuelve a intentarlo</p>
                    </>
                )}
                {state.loading &&(
                    <p>Cargando...</p>
                )}
                
                <input
                    placeholder="Código de seguridad"
                    value={state.value}
                    onChange={onWrite}
                    />
                <button onClick = {onCheck}>
                Comprobar
                </button>
            </div>
        )
    } else if (!!state.confirmed && !state.deleted) {
        return (
            <React.Fragment>
                <p>¿Estás seguro que deseas eliminar {name}?</p>
                <button onClick = {onDelete}>
                Sí, eliminar
                </button>
                <button onClick = {onReset}>
                No, volver
                </button>
            </React.Fragment>
        )
    } else {
        return (
            <React.Fragment>
                <p>Eliminado con éxito</p>
                <button onClick = {onReset}>
                Resetear, volver atrás
                </button>
            </React.Fragment>
        )
    }
}

export { UseReducer }

const actionTypes = {
    confirm: 'CONFIRM',
    error: 'ERROR',
    write: 'WRITE',
    check: 'CHECK',
    delete: 'DELETE',
    reset: 'RESET',
}

const reducerObject = (state, payload) => ({
    [actionTypes.confirm]: {
        ...state, 
        loading: false, 
        error: false, 
        confirmed: true 
    },
    [actionTypes.error]: {
        ...state,
        error: true,
        loading: false
    },
    [actionTypes.write]: {
        ...state,
        value: payload,
    },
    [actionTypes.check]: {
        ...state, 
        loading: true 
    },
    [actionTypes.delete]: {
        ...state,
        deleted: true,
    },
    [actionTypes.reset]: {
        ...state,
        confirmed: false,
        deleted: false,
        value: '',
    }
})

const reducer = (state, action) => {
    if(reducerObject(state)[action.type]) {
        return reducerObject(state, action.payload)[action.type]
    } else {
        return state
    }
}