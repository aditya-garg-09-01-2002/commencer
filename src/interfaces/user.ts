export interface UserProps{
    passwordHash : string | null
    userId : string
    profile : Profile
}

interface Profile{
    id : number
    userId : string
    altId : string | null
    name :  string
}