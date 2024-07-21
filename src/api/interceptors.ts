import axios, { type CreateAxiosDefaults } from 'axios'

const options: CreateAxiosDefaults = {
	baseURL: 'http://localhost:3001',
	headers: {
		'Content-Type': 'application/json'
	},
}

const api = axios.create(options)

export { api }
