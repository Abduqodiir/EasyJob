import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from 'src/modules/users'; 
import { Application } from 'src/modules/applications'; 

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

    @Column({ nullable: true })
    remoteType: string; // fully-remote, hybrid, on-site

    @Column()
    salaryFrom: number;

    @Column()
    salaryTo: number;

    @Column()
    currency: string;

    @Column({
        type: 'enum',
        enum: ['full-time', 'part-time', 'contract', 'internship', 'temporary']
    })
    jobType: string;

    @Column({
        type: 'enum',
        enum: ['entry', 'mid-level', 'senior', 'lead', 'executive']
    })
    experienceLevel: string;

    @Column('simple-array')
    requiredSkills: string[];

    @Column({ type: 'text', nullable: true })
    benefits: string;

    @Column({ nullable: true })
    deadline: Date;

    @Column({ default: true })
    isActive: boolean;

    @Column({ default: 0 })
    views: number;

    @Column({ type: 'simple-array', nullable: true })
    categories: string[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => User, user => user.postedJobs)
    employer: User;

    @OneToMany(() => Application, application => application.job)
    applications: Application[];
}
