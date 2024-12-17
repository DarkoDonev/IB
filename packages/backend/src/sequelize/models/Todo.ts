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
export default class Todo extends Model<Todo> {

    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare id: number

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare todo: string;

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
