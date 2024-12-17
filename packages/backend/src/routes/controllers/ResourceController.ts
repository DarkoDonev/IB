import {Body, Get, JsonController, Post, Req} from "routing-controllers";
import User from "../../sequelize/models/User";
import UserResourcePermission from "../../sequelize/models/UserResourcePermission";
import Todo from "../../sequelize/models/Todo";
import {getParsedToken} from "../../utils/jwtUtils";


@JsonController('/api/resource')
export class ResourceController {

    @Post('/getTodoAccess')
    public async getTodoPermission(@Body() body: { token: string }) {
        if (!body.token) return {status: 'failed', message: 'error'}
        const token = await getParsedToken(body.token)
        const userId = token?.id;

        if (!userId) {
            return {
                status: 'failed',
                message: 'Invalid token'
            }
        }

        const user = await User.findOne({
            where: {
                id: userId
            }
        })

        if (!user) {
            return {
                status: 'failed',
                message: 'User does not exist'
            }
        }

        await this.removePermission(userId);

        if (user.role != 'ADMIN') return {
            status: 'failed',
            message: 'Not authorized'
        }

        await UserResourcePermission.create({
            userId: userId
        } as UserResourcePermission)

        return {
            status: 'success'
        }
    }

    private async removePermission(userId: number) {
        await UserResourcePermission.destroy({
            where: {
                userId: userId
            }
        })
    }

    @Post('/remove')
    public async removeTodoPermission(@Body() body: { token: string }) {
        const token = await getParsedToken(body.token);
        const userId = token?.id;
        if (userId) {
            await this.removePermission(userId)
        }
    }

    @Post('/add')
    public async addTodo(
        @Body() body: { todo: string, token: string }
    ): Promise<{ status: string; message: string }> {
        try {


            if (!body.todo || !body.token) {
                return {
                    status: 'failed',
                    message: 'Error',
                };
            }

            const token = await getParsedToken(body.token)
            const userId = token?.id

            const permission = await UserResourcePermission.findOne({
                where: {userId: userId},
            });

            if (!permission) {
                return {
                    status: 'failed',
                    message: 'User permission not found',
                };
            }

            const currentTime = Date.now();
            const permissionTime = new Date(permission.createdAt).getTime();
            console.log(currentTime - permissionTime)
            if (currentTime - permissionTime <= 6000) {
                const todo = {
                    todo: body.todo,
                } as Todo;

                await Todo.create(todo);

                return {
                    status: 'success',
                    message: 'Added todo successfully',
                };
            }
            await UserResourcePermission.destroy({
                where: {
                    userId: userId
                }
            })
            return {
                status: 'failed',
                message: 'Permission denied: invalid timing',
            };
        } catch (error) {
            console.error('Error adding todo:', error);

            return {
                status: 'failed',
                message: 'An error occurred while adding the todo',
            };
        }
    }

    @Get('/getAll')
    public async getAll(@Req() req: any) {
        const token = req.headers.token
        if (!token) return [];
        const parsedToken = await getParsedToken(token);
        const userId = parsedToken?.id;
        if (!userId) return [];
        const user = await User.findOne({
            where: {
                id: userId
            }
        })
        if (!user) return [];
        return await Todo.findAll();
    }

}