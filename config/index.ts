

export const config = {
    PORT: process.env.PORT || 5000,
    DB_URL: process.env.DB_URL as string,

    JWT_SECRET: process.env.JWT_SECRET as string,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN as string,
    JWT_COOKIE_EXPIRES_IN: process.env.JWT_COOKIE_EXPIRES_IN as string,
    JWT_COOKIE_NAME: process.env.JWT_COOKIE_NAME as string,

    NODE_ENV: process.env.NODE_ENV as string,

    CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
}