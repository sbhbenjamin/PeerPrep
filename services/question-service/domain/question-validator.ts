import * as questionRepository from '../data-access/question-repository';

export async function assertQuestionExistsById(id: string) {
    const question = await questionRepository.getQuestionById(id);
    if (!question) {
        throw new Error(`Question with id: ${id} not found`)
    }
}
export async function assertQuestionExistsByTitle(title: string) {
    const question = await questionRepository.getQuestionByTitle(title);
    if (!question) {
        throw new Error(`Question with title: ${title} does not exist`)
    }
}

export async function assertQuestionNotExistsByTitle(title: string) {
    const question = await questionRepository.getQuestionByTitle(title);
    if (question) {
        throw new Error(`Question with this title already exists: ${title}. ID: ${question.id}`)
    }
}
