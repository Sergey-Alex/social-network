import {FollowedApi, userApi} from "../api/api";
import {Dispatch} from "redux";
import {AppThunk} from "./redux-store";
import {updateObjectInArray} from "../utils/object-helpers";

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SETUSERS = 'SETUSERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_IN_PROGRESS = 'TOGGLE_IS_FOLLOWING_IN_PROGRESS'


export const followSuccess = (userId: number) => {
    return {type: FOLLOW, userId} as const
}

export const setToggleIsFetching = (isFetching: boolean) => {
    return {type: TOGGLE_IS_FETCHING, isFetching} as const
}

export const unFollowSuccess = (userId: number) => {
    return {type: UNFOLLOW, userId} as const
}
export const setUsers = (users: Array<UsersType>) => {
    return {type: SETUSERS, users} as const
}
export const setCurrentPage = (currentPage: number) => {
    return {type: SET_CURRENT_PAGE, currentPage} as const
}
export const setTotalUserCount = (totalUsers: number) => {
    return {type: SET_TOTAL_USERS_COUNT, totalUsers} as const
}
export const toggleIsFollowingProgress = (isFollowingProgress: boolean, userId: number) => {
    return {type: TOGGLE_IS_FOLLOWING_IN_PROGRESS, isFollowingProgress, userId} as const
}

export type UsersActionType =
    ReturnType<typeof followSuccess>
    | ReturnType<typeof unFollowSuccess>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setTotalUserCount>
    | ReturnType<typeof setToggleIsFetching>
    | ReturnType<typeof toggleIsFollowingProgress>


export type UsersType = {
    id: number
    photos: { small: string, large: string }
    followed: boolean
    name: string
    status: string
    location: { city: string, country: string }
}

export type InitialStateType = {
    users: Array<UsersType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: number[]
}
let initialState: InitialStateType = {
    users: [],
    pageSize: 100,
    totalUsersCount: 0,
    currentPage: 10,
    isFetching: false,
    followingInProgress: []
}

const usersReducers = (state: InitialStateType = initialState, action: UsersActionType): InitialStateType => {
    switch (action.type) {
        case FOLLOW:

            return {
                ...state, users: updateObjectInArray<UsersType, keyof UsersType>(state.users, 'id', action.userId, {followed: true})
                // state.users.map(user => {
                // if (user.id === action.userId) {
                //     return {...user, followed: true}
                // }
                // return user
            }


        case
        UNFOLLOW:
            return {
                ...state, users: updateObjectInArray<UsersType, keyof UsersType>(state.users, 'id', action.userId, {followed: false})
            }
        case
        SETUSERS:
            return {...state, users: action.users}
        case
        SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage}
        case
        SET_TOTAL_USERS_COUNT:
            return {...state, totalUsersCount: action.totalUsers}
        case
        TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching}
        case
        TOGGLE_IS_FOLLOWING_IN_PROGRESS:
            return {
                ...state, followingInProgress: action.isFollowingProgress ?
                    [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        default:
            return state
    }
}

export const getUsersThunkCreator = (page: number, pageSize: number): AppThunk => async (dispatch) => {
    dispatch(setToggleIsFetching(true))
    dispatch(setCurrentPage(page))
    let res = await userApi.getUsers(page, pageSize)
    dispatch(setToggleIsFetching(false))
    dispatch(setUsers(res.items));
    dispatch(setTotalUserCount(res.totalCount))
}

const followUnfollowFlow = async (dispatch: Dispatch, userId: number, apiMethod: any, actionCreator: any) => {
    dispatch(toggleIsFollowingProgress(true, userId))
    let res = await apiMethod(userId)
    if (res.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleIsFollowingProgress(false, userId))
}

export const followTC = (id: number): AppThunk => async (dispatch) => {
    await followUnfollowFlow(dispatch, id, FollowedApi.followUser.bind(FollowedApi), followSuccess)
    // dispatch(toggleIsFollowingProgress(true, id))
    // let res = await apiMethod(id)
    // if (res.resultCode === 0) {
    //     dispatch(actionCreator(id))
    // }
    // dispatch(toggleIsFollowingProgress(false, id))
    //

}

export const unFollowTC = (id: number): AppThunk => async (dispatch) => {
    let apiMethod = FollowedApi.unFollowUser.bind(FollowedApi)
    await followUnfollowFlow(dispatch, id, FollowedApi.unFollowUser.bind(FollowedApi), unFollowSuccess)
    // dispatch(toggleIsFollowingProgress(true, id))
    // let res = await apiMethod(id)
    // if (res.resultCode === 0) {
    //     dispatch(actionCreator(id))
    // }
    // dispatch(toggleIsFollowingProgress(false, id))
}


export default usersReducers

