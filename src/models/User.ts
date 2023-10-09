export interface PacienteGet {
    id: string
    nome: string,
    email: string,
    password: string
    role: string
    created_at: Date,
    deleted_at: Date | null,
    updated_at: Date
}

export interface ProfissionalGet {
    id: string
    nome: string,
    email: string,
    password: string
    created_at: Date,
    deleted_at: Date | null,
    updated_at: Date
}

