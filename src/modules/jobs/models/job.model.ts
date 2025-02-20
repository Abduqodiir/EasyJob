import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from 'src/modules/users'; 
import { Application } from 'src/modules/applications'; 
import { ExperienceLevel, JobRemoteType, JobType } from 'src/modules/enums';

@Entity('jobs')
export class Job {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column('text')
    description: string;

    @Column()
    location: string;

    @Column({ 
        type: 'enum',
        enum: JobRemoteType,
        nullable: true 
    })
    remoteType: JobRemoteType;

    @Column()
    salaryFrom: number;

    @Column()
    salaryTo: number;

    @Column()
    currency: string;

    @Column({
        type: 'enum',
        enum: JobType
    })
    jobType: JobType;

    @Column({
        type: 'enum',
        enum: ExperienceLevel
    })
    experienceLevel: ExperienceLevel;

    @Column('simple-array')
    requiredSkills: string[];

    @Column({ type: 'jsonb', nullable: true })
    benefits: {
        type: string;
        description: string;
    }[];

    @Column({ nullable: true })
    deadline: Date;

    @Column({ default: true })
    isActive: boolean;

    @Column({ default: 0 })
    views: number;

    @Column({ type: 'simple-array', nullable: true })
    categories: string[];

    @Column({ default: 0 })
    applicationsCount: number;

    @Column({ type: 'jsonb', nullable: true })
    requirements: {
        education?: string[];
        experience?: string[];
        skills?: string[];
        other?: string[];
    };

    @Column({ nullable: true })
    department: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => User, user => user.postedJobs)
    employer: User;

    @OneToMany(() => Application, application => application.job)
    applications: Application[];
}