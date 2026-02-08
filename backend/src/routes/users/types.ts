export type signup = {
    first_name: string
    last_name: string
    email: string
    password: string
}

export type signin = {
    first_name: string
    last_name: string
    email: string
    password: string
}

export type plan = {
    plan_name: string,
    duration: string,
    price: number,
    valid_till: string,
    description: string,
}