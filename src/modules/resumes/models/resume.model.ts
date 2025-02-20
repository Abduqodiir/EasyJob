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
        location?: string;
        achievements?: string[];
        technologies?: string[];
    }[];

    @Column('jsonb')
    education: {
        institution: string;
        degree: string;
        field: string;
        startDate: Date;
        endDate: Date;
        description: string;
        grade?: string;
        achievements?: string[];
    }[];

    @Column('jsonb')
    skills: {
        category: string;
        items: string[];
        level?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
    }[];

    @Column('jsonb', { nullable: true })
    languages: {
        name: string;
        level: 'basic' | 'intermediate' | 'fluent' | 'native';
    }[];

    @Column('jsonb', { nullable: true })
    certificates: {
        name: string;
        issuer: string;
        date: Date;
        expiryDate?: Date;
        credentialId?: string;
        url?: string;
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

    @Column({ nullable: true })
    templateId: string;

    @Column({ type: 'jsonb', nullable: true })
    projects: {
        name: string;
        description: string;
        url?: string;
        startDate?: Date;
        endDate?: Date;
        technologies?: string[];
        role?: string;
    }[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => User, user => user.resumes)
    user: User;
}