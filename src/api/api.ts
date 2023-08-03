import axios from "axios";
import {UsersType} from "../redux/users-reducer";
import {ProfileContainerType} from "../components/Profile/ProfileContainer";


export type ReturnTypeUsers = {
    items: Array<UsersType>
    totalCount: number
    error: string | null

}

export type FollowUnfollowType<T = {}> = {
    data: T
    resultCode: number
    messages: string[]
}


const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    withCredentials: true,
    headers: {
        "API-KEY": 'fb758589-2463-42a0-929e-f4166fe20e45'
    }
})

export const userApi = {
    getUsers: async (currentPage: number, pageSize: number): Promise<ReturnTypeUsers> => {
        const response = await instance.get<ReturnTypeUsers>(`users?page=${currentPage}&count=${pageSize}`)
        return response.data
    },

}

export const FollowedApi = {
    unFollowUser: async (id: number): Promise<FollowUnfollowType> => {
        const response = await instance.delete<FollowUnfollowType>(`follow/${id}`)
        return response.data
    },
    followUser: async (id: number): Promise<FollowUnfollowType> => {
        const response = await instance.post<FollowUnfollowType>(`follow/${id}`)
        return response.data
    }
}


export const AuthApi = {
    authMe: async () => {
        const response = await instance.get<AuthType>(`auth/me`)
        return response.data
    },
    loginMe: async (data: TypeArgsLogin) => {
        const response = await instance.post<LoginMeOwn<{ userId: number }>>(`auth/login`, data)
        return response.data
    },
    logoutMe: async () => {
        const response = await instance.delete<LoginMeOwn>(`auth/login`)
        return response.data
    }
}

type SubTypeStatus = {
    status: string
}

type StatusType = {
    resultCode: number
    messages: Array<string>
    data: SubTypeStatus
}

export const profileApi = {
    getProfile: async (userId: number): Promise<ProfileContainerType> => {
        const response = await instance.get<ProfileContainerType>(`profile/${userId}`)
        return response.data
    },
    getStatus: async (userId: number): Promise<string> => {
        const response = await instance.get<string>(`profile/status/${userId}`)
        return response.data
    },
    updateStatus: async (status: string): Promise<StatusType> => {
        const res = await instance.put<StatusType>(`profile/status`, {status: status})
        return res.data
    },
    savePhoto: async (photo: string): Promise<sendPhotoType> => {
        const formData = new FormData();
        formData.append('file', photo)
        const res = await instance.put<sendPhotoType>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return res.data
    }

}


type AuthType = {
    resultCode: number
    messages: string[]
    data: {
        id: number
        email: string
        login: string
    }
}

type LoginMeOwn<T = {}> = {
    data: T
    resultCode: number
    messages: string
}

type LoginMePostRequestType = {
    rememberMe: boolean
    email: string
    password: string
}
export type TypeArgsLogin = {
    rememberMe: boolean
    email: string
    password: string
}
export type sendPhotoType = {
    resultCode: number
    messages: string[]
    data: {
        photos: {
            large: string
            small: string
        }
    }
    fieldsErrors: []
}
