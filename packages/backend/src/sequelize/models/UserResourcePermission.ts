import {
    AutoIncrement, BelongsTo,
    Column,
    CreatedAt,
    DataType,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
    UpdatedAt,
} from "sequelize-typescript";
import User from "./User";


@Table({
    charset: 'utf8mb4',
})
export default class UserResourcePermission extends Model<UserResourcePermission> {

    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare id: number

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare userId: number;

    @BelongsTo(() => User)
    declare user: User;

    @CreatedAt
    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    declare createdAt: Date;


    @UpdatedAt
    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    declare updatedAt: Date;
}
