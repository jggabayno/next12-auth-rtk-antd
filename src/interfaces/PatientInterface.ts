export interface PatientGetPostPatchResponseInterface {
    data: PatientInterface[],
    message: string,
    error: any
}

export interface PatientDeleteResponseInterface {
    data: {
        id: number
    },
    message: string,
    error: any
}

export interface PatientPostParamsInterface {
    clinic_id: number
    branch_id: number
    clinic_role: string
    first_name: string
    middle_name: string
    last_name: string
    email: string
    password: string
    password_confirm: string
}

export interface PatientPatchParamsInterface {
    clinic_id: number
    branch_id: number
    first_name: string
    middle_name: string
    last_name: string
}

export interface PatientInterface {
    id: number
    clinic_role: string
    clinic_id: number
    clinic_name: string,
    branch_id: number,
    username: string,
    first_name: string,
    middle_name: string,
    last_name: string
    email: string,
    subscription: string,
    display_name: string,
    date_joined: string
}