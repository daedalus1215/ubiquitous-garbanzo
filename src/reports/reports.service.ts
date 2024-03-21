import { InjectRepository } from "@nestjs/typeorm";
import { CreateReportDto } from "./dtos/create-report.dto";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { Report } from "./report.entity";
import { User } from "src/users/user.entity";

@Injectable()
export class ReportsService {
    constructor(@InjectRepository(Report) private repo: Repository<Report>) {
        this.repo = repo;
    }

    create(dto: CreateReportDto, user: User) {
        const report = this.repo.create((dto as Report));
        report.user = user;
        return this.repo.save(report);
    }
}