import * as jobRepository from "../repositories/job/jobRepository";


export async function createJobService(job) {
    return await jobRepository.createJobRepository(job);
}

export async function getAllJobsService() {
    return await jobRepository.getAllJobsRepository();
}