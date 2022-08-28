import axios from "axios";
import {UsersType} from "../redux/users-reducer";
import {ProfileContainerType} from "../components/Profile/ProfileContainer";


export type ReturnTypeUsers = {
    items: Array<UsersType>
    totalCount: number
    error: string | null

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
    unFollowUser: async (id: number): Promise<ReturnTypeUsers> => {
        const response = await instance.delete<ReturnTypeUsers>(`follow/${id}`)
        return response.data
    },
    followUser: async (id: number): Promise<ReturnTypeUsers> => {
        const response = await instance.post<ReturnTypeUsers>(`follow/${id}`)
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
    updateStatus: async  (status: string): Promise<StatusType> => {
        const res = await instance.put<StatusType>(`profile/status`, {status: status})
        return res.data
    }

}



type AuthType = {
    resultCode: number
    messages: [],
    data: {
        id: number,
        email: string,
        login: string
    }
}
type LoginMeType = {
    resultCode: 0
    messages: [],
    data: {
        userId: number
    }
}

export const AuthApi = {
    authMe: async (): Promise<AuthType> => {
        const response = await instance.get<AuthType>(`auth/me`)
        return response.data
    },
    loginMe: async (email:string, password: string, rememberMe: boolean): Promise<LoginMeType> => {
        const response = await instance.post<LoginMeType>(`/auth/login`, {email, password, rememberMe})
        return  response.data
    }
}