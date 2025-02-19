import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Application } from 'src/modules/applications';
import { Resume } from 'src/modules/resumes'; 
import { Job } from 'src/modules/jobs';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    phoneNumber: string;

    @Column({ nullable: true })
    avatar: string;

    @Column({ type: 'text', nullable: true })
    bio: string;

    @Column({ default: false })
    isEmployer: boolean;

    @Column({ nullable: true })
    companyName: string;

    @Column({ nullable: true })
    companyWebsite: string;

    @Column({ nullable: true })
    companyLogo: string;

    @Column({ type: 'text', nullable: true })
    companyDescription: string;

    @Column({ nullable: true })
    companyAddress: string;

    @Column({ default: true })
    isActive: boolean;

    @Column({ default: false })
    isVerified: boolean;

    @Column({ nullable: true })
    lastLoginAt: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Application, application => application.user)
    applications: Application[];

    @OneToMany(() => Resume, resume => resume.user)
    resumes: Resume[];

    @OneToMany(() => Job, job => job.employer)
    postedJobs: Job[];
}