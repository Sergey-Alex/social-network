import React, {createContext} from "react";
import {StoreType} from "./redux/redux-store";

const StoreContext = createContext({} as StoreType)

export default StoreContext

export type ProviderType = {
    store: StoreType
    children?: React.ReactNode
}

export const Provider = (props: ProviderType) => {
    return (
        <StoreContext.Provider value={props.store}>
            {props.children}
        </StoreContext.Provider>
    )
}