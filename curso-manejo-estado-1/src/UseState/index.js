import React from "react";

const SECURITY_CODE = 'paradigma'

const UseState = ({ name }) => {
    const [state, setState] = React.useState({
        value: '',
        error: false,
        loading: false
    })


    React.useEffect(() => {
        console.log('Empezando el efecto')

        if(!!state.loading) {
            setTimeout(() => {
                console.log('Haciendo la validación')
    
                if(state.value === SECURITY_CODE) {
                    setState({...state, loading: false, error: false } )
                } else {
                    setState({...state, loading: false, error: true })
                }
    
                console.log('Terminando la validación')
            }, 3000);
        }

        console.log('Terminando el efecto')
    }, [state.loading])

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
                    setState({...state, value: event.target.value })
                }}
                />
            <button
                onClick={() => {
                    // setError(false) Este fue
                    setState({...state, loading: true })
                    }}
            >   Comprobar</button>
        </div>
    )
}

export { UseState }