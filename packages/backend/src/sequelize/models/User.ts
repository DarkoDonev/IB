import {AutoIncrement, Column, CreatedAt, DataType, Model, PrimaryKey, Table, UpdatedAt,} from "sequelize-typescript";


@Table({
    charset: 'utf8mb4',
})
export default class User extends Model<User> {

    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare id: number

    @Column({
        type: DataType.BIGINT,
        allowNull: true,
        unique: false
    })
    declare authNumber: number;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: true
    })
    declare active: boolean;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare email: string;

    @Column({
        type: DataType.BIGINT,
        allowNull: true
    })
    declare tfaNumber: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare password: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare role: string;

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
