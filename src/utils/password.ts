import bcrypt from 'bcryptjs'

export const hashPassword = async ( password: string ) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
}

export const comparePassword = async ( password: string, savedPassword: string ) => {
    const result: boolean = await bcrypt.compare(password, savedPassword);
    return result;
}