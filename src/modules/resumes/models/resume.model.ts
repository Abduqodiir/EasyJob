import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from 'src/modules/users'; 

@Entity('resumes')
export class Resume {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column('text')
    summary: string;

    @Column('jsonb')
    experience: {
        company: string;
        position: string;
        startDate: Date;
        endDate: Date;
        description: string;
        isCurrentlyWorking: boolean;
    }[];

    @Column('jsonb')
    education: {
        institution: string;
        degree: string;
        field: string;
        startDate: Date;
        endDate: Date;
        description: string;
    }[];

    @Column('simple-array')
    skills: string[];

    @Column('simple-array', { nullable: true })
    languages: string[];

    @Column('jsonb', { nullable: true })
    certificates: {
        name: string;
        issuer: string;
        date: Date;
        expiryDate?: Date;
    }[];

    @Column('simple-array', { nullable: true })
    interests: string[];

    @Column({ nullable: true })
    website: string;

    @Column({ nullable: true })
    linkedin: string;

    @Column({ nullable: true })
    github: string;

    @Column({ nullable: true })
    portfolio: string;

    @Column({ default: true })
    isActive: boolean;

    @Column({ default: false })
    isPublic: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => User, user => user.resumes)
    user: User;
}