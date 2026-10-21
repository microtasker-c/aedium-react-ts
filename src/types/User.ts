export type User = {

    id: string,
    name: string,
    role?: undefined | string | null,
    email: string,
    image?: undefined | string | null,
    banned?: undefined | boolean | null,
    banReason?: undefined | string | null,
    createdAt: Date,
    updatedAt: Date,
    banExpires?: null | Date | undefined,
    emailVerified: boolean

}