import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from 'src/modules/users';
import { Job } from 'src/modules/jobs'; 
import { ApplicationStatus, InterviewType } from 'src/modules/enums';

@Entity('applications')
export class Application {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    coverLetter: string;

    @Column({
        type: 'enum',
        enum: ApplicationStatus,
        default: ApplicationStatus.PENDING
    })
    status: ApplicationStatus;

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
        uploadedAt: Date;
    }[];

    @Column({ type: 'jsonb', nullable: true })
    interviewDetails: {
        scheduledAt: Date;
        type: InterviewType;
        location?: string;
        notes?: string;
        interviewer?: string;
        feedback?: string;
        rating?: number;
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