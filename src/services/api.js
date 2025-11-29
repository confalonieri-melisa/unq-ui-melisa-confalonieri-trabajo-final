import axios from "axios";

const API = 'https://preguntados-api.vercel.app/api';

export const getDifficulties = async() => {
    const { data } = await axios.get(`${API}/difficulty`);
    return data;
}

export const getQuestions = async(difficulty) => {
    const { data } = await axios.get(`${API}/questions`, {params: { difficulty }});
    return data;
}

export const checkAnswer = async(questionId, option) => {
    const { data } = await axios.post(`${API}/answer`, {questionId, option});
    return data;
}