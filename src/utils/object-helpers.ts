import {UsersActionType, UsersType} from "../redux/users-reducer";
type ValueOf<W> = W[keyof W]
// export const updateObjectInArray = <T>(items: T[], objPropName: keyof T, id:, newObjProps: any) => {
//     return items.map((u: T) => {
//         if (u[objPropName] === id) {
//             return {...u, ...newObjProps}
//         }
//         // if (objPropName['id'] === id) {
//         //     return {...u,...newObjProps}
//         // }
//         return u
//     })
// }
// Omit<UsersType, ['locations']>
export const updateObjectInArray = <T, K extends keyof T>(items: T[], objPropName: K, id: T[K], newObjProps: Partial<T>): T[] => {
    return items.map((u: T) => {
        if (u[objPropName] === id) {
            return {...u, ...newObjProps};
        }
        return u;
    });
};
