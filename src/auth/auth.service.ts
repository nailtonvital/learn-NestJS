import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) {}
    async signup(dto: AuthDto) {
        const hash = await argon.hash(dto.password)
        console.log(hash);
        

        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                hash,
                firstName: null,
                lastName: null,

            },
            select: {
                id: true,
                email: true,
            }
        })
        return user
    }

    signin() {
        return {msg:"This is a signin route"}
    }
}