import * as applicationRepository from "../repositories/application/applicationRepository";
import * as jobRepository from "@/repositories/job/jobRepository.js";

export async function createApplicationService(application) {
    return await applicationRepository.createApplicationRepository(application);
}

export async function getApplicationByUserService(userId) {
    return await applicationRepository.getApplicationByUserRepository(userId);
}

export async function getAllApplicationsService() {
    return await applicationRepository.getAllApplicationsRepository();
}

export async function getApplicationsByJobIdService(jobId) {
    return await applicationRepository.getApplicationsByJobIdRepository(jobId);
}

export async function updateApplicationService(id, resume) {
    return await applicationRepository.updateApplicationRepository(id, resume);

}

