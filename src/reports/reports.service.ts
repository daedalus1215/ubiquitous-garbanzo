import { InjectRepository } from "@nestjs/typeorm";
import { CreateReportDto } from "./dtos/create-report.dto";
import { Repository } from "typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";
import { Report } from "./report.entity";
import { User } from "src/users/user.entity";
import { ApproveReportDto } from "./dtos/approve-report.dto";

@Injectable()
export class ReportsService {
    constructor(@InjectRepository(Report) private repo: Repository<Report>) {
        this.repo = repo;
    }

    create(dto: CreateReportDto, user: User) {
        const report = this.repo.create((dto as Report));
        report.user = user;
        report.approved = false;
        return this.repo.save(report);
    }

    async changeApproval(id: string, approved: boolean) {
        const report = await this.repo.findOne({ where: { id: parseInt(id) } });
        if (!report) {
            throw new NotFoundException('report not found');
        }
        report.approved = approved;
        return this.repo.save(report);
    }
}