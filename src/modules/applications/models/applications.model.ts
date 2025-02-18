import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from 'src/modules/users';
import { Job } from 'src/modules/jobs'; 

@Entity('applications')
export class Application {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    coverLetter: string;

    @Column({
        type: 'enum',
        enum: ['pending', 'reviewing', 'shortlisted', 'interviewed', 'offered', 'accepted', 'rejected'],
        default: 'pending'
    })
    status: string;

    @Column({ nullable: true })
    expectedSalary: number;

    @Column({ nullable: true })
    noticePeriod: string;

    @Column({ type: 'text', nullable: true })
    rejectionReason: string;

    @Column({ nullable: true })
    resumeUrl: string;

    @Column({ type: 'jsonb', nullable: true })
    additionalDocuments: {
        name: string;
        url: string;
        type: string;
    }[];

    @Column({ type: 'jsonb', nullable: true })
    interviewDetails: {
        scheduledAt: Date;
        type: string;
        location?: string;
        notes?: string;
    }[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => User, user => user.applications)
    user: User;

    @ManyToOne(() => Job, job => job.applications)
    job: Job;
}