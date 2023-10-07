import * as questionRepository from '../data-access/question-repository';

export async function assertQuestionExistsById(id: string) {
    const question = await questionRepository.getQuestions({id: id});
    if (!question?.length) {
        throw new Error(`Question with id: ${id} not found`)
    }
}

export async function assertQuestionNotExistsByTitle(title: string) {
    const question = await questionRepository.getQuestions({title: title});
    if (question?.length) {
        throw new Error(`Question with this title: ${title} already exists. ID: ${question[0].id}`)
    }
}
