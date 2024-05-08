// const reducer = (state, action) => {
// }

const reducer = (state, action) => {
    if (action.type === 'ERROR') {
        return {
            ...state,
            error: true,
            loading: false
        }
    } else if (action.type === 'CHECK') {
        return {
            ...state,
            loading: true
        }
    } else {
        return {
            ...state,
        }
    }
}

const reducerSwitch = (state, action) => {
    switch (action.type) {
        case 'ERROR':
            return {
                ...state,
                error: true,
                loading: false
            }
        case 'CHECK':
            return {
                ...state,
                loading: true
            }
        default:
            return {
                ...state,
            }
    }
}