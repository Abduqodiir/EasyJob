import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from 'src/modules/users'; 

@Entity('tokens')
export class Token {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    token: string;

    @Column({ default: false })
    isRevoked: boolean;

    @Column({ type: 'timestamp' })
    expiresAt: Date;

    @Column()
    userId: string;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    user: User;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
