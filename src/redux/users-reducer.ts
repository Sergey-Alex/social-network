


const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SETUSERS = 'SETUSERS'


export const followAC = (userId: number) => {
    return {type: FOLLOW, userId} as const
}

export const unFollowAC = (userId: number) => {
    return {type: UNFOLLOW, userId} as const
}
export const setUsersAC = (users: Array<UsersType>) => {
    return {type: SETUSERS, users} as const
}

type UsersActionType = ReturnType<typeof followAC>
    | ReturnType<typeof unFollowAC>
    | ReturnType<typeof setUsersAC>

export type UsersType = {
    id: number
    photoUrl: string
    followed: boolean
    fullName: string
    status: string
    location: { city: string, country: string }
}

export type InitialStateType = {
    users: Array<UsersType>
}
let initialState: InitialStateType = {
    users: [
        // {
        //     id: 1,
        //     photoUrl: 'https://png.pngtree.com/element_our/png_detail/20181206/users-vector-icon-png_260862.jpg',
        //     followed: false,
        //     fullName: 'Sergio',
        //     status: 'i am boss',
        //     location: {city: 'Minsk', country: 'Belarus'}},
        // {
        //     id: 2,
        //     photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiXiaFDvuEOMuoyhYqbYu3YbBVAQfcIp7QosQDBy9fWyKqlaMpEjCSLRfnoUDc1X5X_PQ&usqp=CAU',
        //     followed: false,
        //     fullName: 'Semen',
        //     status: 'i am not boss',
        //     location: {city: 'Moscow', country: 'Russia'}
        // },
        // {
        //     id: 3,
        //     photoUrl: 'https://images.freeimages.com/images/premium/previews/2092/20923708-lady-user-icon.jpg',
        //     followed: false,
        //     fullName: 'Maria',
        //     status: 'i am not boss',
        //     location: {city: 'Kiev', country: 'Ukraine'}
        // },
    ],
}

const usersReducers = (state: InitialStateType = initialState, action: UsersActionType): InitialStateType => {
    switch (action.type) {
        case FOLLOW:

            return {...state, users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return {...user, followed: true}
                    }
                    return user
                })
            }

        case UNFOLLOW:
            return {
                ...state, users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return {...user, followed: !user.followed}
                    }
                    return user
                })
            }
        case SETUSERS:
            return {...state, users: [...state.users, ...action.users]}
        default:
            return state
    }
}

export default usersReducers

