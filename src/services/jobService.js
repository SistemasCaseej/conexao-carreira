import * as jobRepository from "../repositories/job/jobRepository";


export async function createJobService(job) {
    return await jobRepository.createJobRepository(job);
}