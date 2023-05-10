import { IUser } from "./User";

export interface IPost{
    id?: string,
    text: string,
    photo: string,
    like: number,
    user: IUser
}