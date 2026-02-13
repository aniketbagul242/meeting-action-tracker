import axios from "axios";

const BASE_URL = "https://meeting-action-tracker-7h4g.onrender.com/api";

export const getStatus = () => axios.get(`${BASE_URL}/status`);

export const postTranscript = (content) => axios.post(`${BASE_URL}/transcripts`, { content });

export const getActionItems = () => axios.get(`${BASE_URL}/actions`);

export const updateActionItem = (id, data) => axios.put(`${BASE_URL}/actions/${id}`, data);

export const deleteActionItem = (id) => axios.delete(`${BASE_URL}/actions/${id}`);

export const getTranscriptHistory = () => axios.get(`${BASE_URL}/transcripts/history`);

export const postActionItem = (data) => axios.post(`${BASE_URL}/actions`, data);



