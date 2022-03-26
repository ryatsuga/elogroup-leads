import { v4 as uuidv4 } from 'uuid';

export const leadsData = [
	{
		id: String(uuidv4()),
		name: 'Fiat',
		contact: '31 3535-9090',
		email: 'br@fiat.com',
		opportunities: ['RPA', 'Produto Digital', 'Analytics', 'BPM'],
		status: 'potential_client',
		createdBy: String(uuidv4()),
		createdAt: new Date(),
	},
	{
		id: String(uuidv4()),
		name: 'Google',
		contact: '31 3535-8080',
		email: 'br@google.com',
		opportunities: ['Analytics', 'BPM'],
		status: 'potential_client',
		createdBy: String(uuidv4()),
		createdAt: new Date(),
	},
	{
		id: String(uuidv4()),
		name: 'Microsoft',
		contact: '31 3535-2020',
		email: 'br@microsoft.com',
		opportunities: ['Analytics'],
		status: 'meeting_scheduled',
		createdBy: String(uuidv4()),
		createdAt: new Date(),
	},
];
