import { InjectRepository } from "@nestjs/typeorm";
import { CreateReportDto } from "./dtos/create-report.dto";
import { Repository } from "typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";
import { Report } from "./report.entity";
import { User } from "src/users/user.entity";
import { ApproveReportDto } from "./dtos/approve-report.dto";
import { GetEstimateDto } from "./dtos/get-estimate.dto";

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

    // createEstimate(query: GetEstimateDto) {
    //     return this.repo.createQueryBuilder()
    //         .select("*")
    //         .where("make = :make", { make: query.make })
    //         .andWhere('lng - :lng BETWEEN -5 AND 5', { lng: query.lng })
    //         .andWhere('lat - :lat BETWEEN -5 AND 5', { lat: query.lat })
    //         .andWhere('year - :year BETWEEN -3 AND 3', { year: query.year })
    //         .orderBy('mileage - :mileage')
    //         .setParameters({ mileage: query.mileage })
    //         .getRawMany();
    // }

    createEstimate({ make, lng, lat, year, mileage }: GetEstimateDto) {
        return this.repo.createQueryBuilder()
            .select("*")
            .where("make = :make", { make })
            .andWhere('lng - :lng BETWEEN -5 AND 5', { lng })
            .andWhere('lat - :lat BETWEEN -5 AND 5', { lat })
            .andWhere('year - :year BETWEEN -3 AND 3', { year })
            .orderBy('mileage - :mileage')
            .setParameters({ mileage })
            .getRawMany();
    }
}