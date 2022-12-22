import { createStore } from "redux"

const initiolvalue = {
    user:null
}

const appReducer = (prevstate = initiolvalue,action) => {
    return {
      ...prevstate,
      [action.type] :action.payload
    }
}

const store = createStore(appReducer)

export default store;