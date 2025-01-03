import {Body, Get, HeaderParam, HttpError, JsonController, Param, Post, Res} from "routing-controllers";
import User from "../../sequelize/models/User";
import {comparePassword, createToken} from "../../utils/jwtUtils";
import {sendAuthenticationMail, sendTFACode} from "../../utils/send-authentication-mail";
import {encryptPassword} from "../../utils/encrypt-password";


@JsonController("/api/auth")
export class AuthenticationController {


    @Post('/createAccounts')
    public async createAccounts() { // TODO THIS IS USED FOR TESTING PURPOSES ONLY
        if (await User.count() != 0) await User.destroy()
        if (await User.count() === 0) {
            const users = [
                {
                    email: "admin",
                    password: await encryptPassword("admin"),
                    role: "ADMIN",
                    active: true,
                    authNumber: -1,
                    tfaNumber: -1,
                },
                {
                    email: "user",
                    password: await encryptPassword("user"),
                    role: "USER",
                    active: true,
                    authNumber: -1,
                    tfaNumber: -1,
                },
            ];

            for (const user of users) {
                await User.create(user as User);
            }

            return {status: "success", message: "Admin and User accounts created."};
        } else {
            return {status: 'error'}
        }
    }


    @Post('/login')
    public async signIn(@Body() body: any) {
        let user = await User.findOne({
            where: {
                email: body.email,
            },
        });

        if (!user) {
            return {status: 'error', message: 'User Not Found.'};
        }

        if (!user.active) {
            return {status: 'error', message: 'User Not Active.'};
        }

        let passwordIsValid = await comparePassword(body.password, user.password);

        if (!passwordIsValid) {
            return {status: 'error', message: 'Passwords not matching'};
        }
        let tfaNumber = 1;
        if (!(user.email == 'admin') && !(user.email == 'user')) {
            tfaNumber = Math.ceil(Math.random() * 1000000000);
            await sendTFACode(user.email, tfaNumber);
        }

        await User.update({
            tfaNumber: tfaNumber
        }, {
            where: {
                id: user.id
            }
        });


        return {
            status: 'success',
            data: {
                id: user.id,
                email: user.email,
            },
        };
    }

    @Post('/register')
    async singUp(@HeaderParam('user-agent') userAgent: string, @Body() body: any) {
        let user = await User.findOne({
            where: {
                email: body.email,
            }
        });
        if (user) throw new HttpError(400, 'Failed! Email is already in use!')
        let loginNumber = 0;
        while (true) {
            loginNumber = (Math.random() * 1000000000) | 0;

            user = await User.findOne({
                where: {
                    authNumber: loginNumber
                }
            })
            if (!user) break;
        }

        await sendAuthenticationMail(body.email, loginNumber);

        let data: any = {
            active: false,
            email: body.email,
            password: await encryptPassword(body.password),
            authNumber: loginNumber
        }

        return await User.create(data);
    }

    @Get(`/authenticate/:id`)
    async authenticate(@Param("id") id: number) {
        let user = await User.findOne({
            where: {
                authNumber: id
            }
        });

        if (!user || user.active) throw new Error('You can\'t authenticate this user');

        await User.update({
            active: true,
            authNumber: -1,
        }, {
            where: {
                id: user.id
            }
        })
        return 'ok';

    }

    @Post('/authTfa')
    async authTFA(@Body() body: any) {
        const email = body.email;
        const tfa = body.tfa;

        const user = await User.findOne({
            where: {
                email: email,
            }
        })

        if (!user) return {status: 'error', message: 'User Not Found.'};
        if (user.tfaNumber != -1 && user.tfaNumber != tfa) return {status: 'error', message: 'Invalid TFA Code'}

        const token = createToken(user);

        await User.update({
            tfaNumber: -1
        }, {
            where: {
                id: user.id
            }
        })

        return {
            status: 'success',
            data: {
                token: token
            },
        };
    }

}
