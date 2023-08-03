import React, {ComponentType, Suspense} from "react";
import {RouteComponentProps} from "react-router-dom";


export function withSuspense<T>(Component: ComponentType<T>) {
    return (props: T & RouteComponentProps) => {
        return <Suspense fallback={<div>Loading...</div>}>
            <Component {...props}/>
        </Suspense>
    }
}
