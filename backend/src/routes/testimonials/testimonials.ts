import express from "express"
import authMiddleware from "../../middlewares/authMiddleware.js"
import multer from "multer"
import type { NewTestimonial } from "./types.js"
import uploadAsset from "../../cloudinary.js"
import prisma from "../../prisma.js"
import encrypt from "../../functions/encrypt.js"
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const testiMonialRouter = express.Router()
import crypto from "crypto";
const ALGORITHM = "aes-256-gcm";
const SECRET_KEY = crypto
    .createHash("sha256")
    .update("Secret")
    .digest(); // 32 bytes
const IV_LENGTH = 12;

export function encryptObject<T>(data: T): string {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(ALGORITHM, SECRET_KEY, iv);

    const encrypted = Buffer.concat([
        cipher.update(JSON.stringify(data), "utf8"),
        cipher.final()
    ]);

    const authTag = cipher.getAuthTag();

    return Buffer.concat([iv, authTag, encrypted]).toString("base64");
}


testiMonialRouter.post('/getTestimonial', authMiddleware, async (req: express.Request, res: express.Response) => {
    try {
        const { space_id } = req.body;
        if (!space_id) {
            res.status(400).json({
                message: "Bad request",
                valid: false
            })
            return
        }
        const response = await prisma.$transaction(async (tx) => {
            const testimonials = await tx.testimonial.findMany({
                where: {
                    space_id: space_id
                }
            })
            return { testimonials }
        }, { maxWait: 5000, timeout: 2000 })

        if (!response || !response.testimonials) {
            res.status(403).json({
                message: "Unable to fetch testimonials",
                valid: false
            })
            return
        }
        const testimonials = response.testimonials.map((item) => {
            const payload = {
                name: item.name,
                message: item.message,
                avatar: item.avatar
            };


            let obj = {
                ...item,
                encrypted_link: encryptObject(payload),
            }
            return obj;
        })
        res.status(200).json({
            valid: true,
            testimonials: testimonials
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Somethhing went wrong",
            valid: false
        })
    }
})

testiMonialRouter.post('/createEmbed', authMiddleware, async (req: express.Request, res: express.Response) => {
    try {
        const { testimonial_id, margin, background, border_thickness, text_size, border_color, text_font, shadow, border_radius, design_type, avatar, text_color } = req.body;

        const response = await prisma.$transaction(async (tx) => {
            const embed = tx.embed.upsert({

                create: {
                    testimonial_id: testimonial_id,
                    design_type: design_type,
                    image: avatar,
                    border_color: border_color,
                    text_color: text_color,
                    border_radius: border_radius,
                    border_thickness: border_thickness,
                    margin: margin,
                    text_font: text_font,
                    text_size: text_size,
                    background: background,
                    shadow: shadow
                },
                where: {
                    testimonial_id: testimonial_id
                },
                update: {
                    design_type: design_type,
                    image: avatar,
                    border_color: border_color,
                    text_color: text_color,
                    border_radius: border_radius,
                    border_thickness: border_thickness,
                    margin: margin,
                    text_font: text_font,
                    text_size: text_size,
                    background: background,
                    shadow: shadow
                }
            })
            return { embed }
        }, { maxWait: 5000, timeout: 2000 })

        if (!response || !response.embed) {
            res.status(403).json({
                message: "Unable to create embed link",
                valid: false
            })
            return
        }
        res.status(200).json({
            message: "Saved",
            valid: true
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: error,
            message: "Something went wrong",
            valid: false
        })
    }
})
export default testiMonialRouter