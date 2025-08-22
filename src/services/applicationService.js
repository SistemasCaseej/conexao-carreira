import * as applicationRepository from "../repositories/application/applicationRepository";

export async function createApplicationService(application) {
    return await applicationRepository.createApplicationRepository(application);
}

export async function getApplicationByUserService(userId) {
    return await applicationRepository.getApplicationByUserRepository(userId);
}

export async function getAllApplicationsService() {
    return await applicationRepository.getAllApplicationsRepository();
}

