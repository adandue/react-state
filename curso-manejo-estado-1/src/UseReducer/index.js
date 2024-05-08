import React from "react";

const SECURITY_CODE = 'paradigma'

const UseReducer = ({ name }) => {
    const [state, dispatch] = React.useReducer(reducer, initialState)


    React.useEffect(() => {
        console.log('Empezando el efecto')

        if(!!state.loading) {
            setTimeout(() => {
                console.log('Haciendo la validación')
    
                if(state.value === SECURITY_CODE) {
                    dispatch({
                        type: 'CONFIRM'
                    })
                } else {
                    dispatch({
                        type: 'ERROR'
                    })
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
                    onChange={(event) => {
                        dispatch({
                        type: 'WRITE',
                        payload: event.target.value,
                        })
                        // onWrite(event.target.value)
                    }}
                    />
                <button
                    onClick={() => {
                        // setError(false) Este fue
                        dispatch({
                        type: 'CHECK'
                    })
                        }}
                >   Comprobar</button>
            </div>
        )
    } else if (!!state.confirmed && !state.deleted) {
        return (
            <React.Fragment>
                <p>¿Estás seguro que deseas eliminar {name}?</p>
                <button
                    onClick={() => {
                        dispatch({
                        type: 'DELETE'
                        })
                    }}
                >
                Sí, eliminar
                </button>
                <button
                    onClick={() => {
                        dispatch({
                        type: 'RESET'
                        })
                    }}
                >
                No, volver
                </button>
            </React.Fragment>
        )
    } else {
        return (
            <React.Fragment>
                <p>Eliminado con éxito</p>
                <button
                    onClick={() => {
                        dispatch({
                        type: 'RESET'
                        })
                    }}
                >
                Resetear, volver atrás
                </button>
            </React.Fragment>
        )
    }
}

export { UseReducer }

const initialState = {
    value: '',
    error: false,
    loading: false,
    deleted: false,
    confirmed: false
}

const reducerObject = (state, payload) => ({
    'CONFIRM': {
        ...state, 
        loading: false, 
        error: false, 
        confirmed: true 
    },
    'ERROR': {
        ...state,
        error: true,
        loading: false
    },
    'WRITE': {
        ...state,
        value: payload,
    },
    'CHECK': {
        ...state, 
        loading: true 
    },
    'DELETE': {
        ...state,
        deleted: true,
    },
    'RESET': {
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