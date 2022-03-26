import React, { useCallback, useContext, useEffect } from 'react';
import { LeadDTO } from '../dtos/LeadDTO';

interface LeadsContextData {
	leads: LeadDTO[];
	createLead: (lead: LeadDTO) => void;
	updateLead: (lead: LeadDTO) => void;
	updateLeadStatus: (id: string, newStatus: string) => void;
	removeLead: (id: string) => void;
	resetLeadsStatus: () => void; //Test
}

const LeadsContext = React.createContext<LeadsContextData>(
	{} as LeadsContextData
);

function LeadsProvider({ children }: { children: React.ReactNode }) {
	const [leads, setLeads] = React.useState<LeadDTO[]>(() => {
		const storagedLeads = localStorage.getItem('@elogroup-leads:leads');
		if (storagedLeads) {
			return JSON.parse(storagedLeads);
		}
		return [];
	});

	useEffect(() => {
		console.log(leads);
	}, [leads]);

	const createLead = useCallback(
		(lead: LeadDTO): void => {
			const res = localStorage.getItem('@elogroup-leads:leads');
			if (res) {
				const storagedLeads = JSON.parse(res);

				const leadExists = storagedLeads.filter(
					(item: LeadDTO) => item.name === lead.name
				);

				if (leadExists[0]) {
					throw new Error('Já existe um Lead cadastrado com esse nome');
				}

				const newLeads = [...storagedLeads, lead];

				localStorage.setItem('@elogroup-leads:leads', JSON.stringify(newLeads));
				setLeads(newLeads);
			} else {
				const newLeads = [...leads, lead];

				localStorage.setItem('@elogroup-leads:leads', JSON.stringify(newLeads));
				setLeads(newLeads);
			}
		},
		[leads]
	);

	const updateLead = useCallback((lead: LeadDTO): void => {
		const res = localStorage.getItem('@elogroup-leads:leads');

		if (!res) {
			throw new Error('Não existem Leads cadastradas no sistema');
		}

		const storagedLeads = JSON.parse(res);

		const leadExists = storagedLeads.filter(
			(item: LeadDTO) => item.id === lead.id
		);

		if (!leadExists[0]) {
			throw new Error('Lead não cadastrada no sistema');
		}

		const updatedLeads = storagedLeads.map((item: LeadDTO) =>
			item.id === lead.id ? lead : item
		);

		localStorage.setItem('@elogroup-leads:leads', JSON.stringify(updatedLeads));
		setLeads(updatedLeads);
	}, []);

	const updateLeadStatus = useCallback(
		(id: string, newStatus: string): void => {
			const status = [
				'potential_client',
				'confirmed_data',
				'meeting_scheduled',
			];

			if (!status.indexOf(newStatus)) {
				throw new Error('Novo status não existe');
			}

			const res = localStorage.getItem('@elogroup-leads:leads');

			if (!res) {
				throw new Error('Não existem Leads cadastradas no sistema');
			}

			const storagedLeads = JSON.parse(res);

			const leadExists = storagedLeads.filter(
				(item: LeadDTO) => item.id === id
			);

			if (!leadExists[0]) {
				throw new Error('Lead não cadastrada no sistema');
			}

			const homeIndex = status.indexOf(leadExists.status);
			const newStatusIndex = status.indexOf(newStatus);

			const isAfterIndex = newStatusIndex >= homeIndex;

			if (!isAfterIndex) {
				throw new Error('Não é possível retroceder o status de Leads');
			}

			const updatedLeads = storagedLeads.map((item: LeadDTO) =>
				item.id === id ? { ...item, status: newStatus } : item
			);

			localStorage.setItem(
				'@elogroup-leads:leads',
				JSON.stringify(updatedLeads)
			);
			setLeads(updatedLeads);
		},
		[]
	);

	const removeLead = useCallback((id: string): void => {
		const res = localStorage.getItem('@elogroup-leads:leads');

		if (!res) {
			throw new Error('Não existem Leads cadastradas no sistema');
		}

		const storagedLeads = JSON.parse(res);
		const leadExists = storagedLeads.filter((item: LeadDTO) => item.id === id);
		if (!leadExists[0]) {
			throw new Error('Lead não cadastrada no sistema');
		}

		const updatedLeads = storagedLeads.filter(
			(item: LeadDTO) => item.id !== id
		);

		localStorage.setItem('@elogroup-leads:leads', JSON.stringify(updatedLeads));
		setLeads(updatedLeads);
	}, []);

	const resetLeadsStatus = useCallback((): void => {
		const res = localStorage.getItem('@elogroup-leads:leads');

		if (!res) {
			throw new Error('Não existem Leads cadastradas no sistema');
		}

		const storagedLeads = JSON.parse(res);
		const resetedLeads = storagedLeads.map((item: LeadDTO) => ({
			...item,
			status: 'potential_client',
		}));

		localStorage.setItem('@elogroup-leads:leads', JSON.stringify(resetedLeads));
		setLeads(resetedLeads);
	}, []);

	return (
		<LeadsContext.Provider
			value={{
				leads,
				createLead,
				updateLead,
				updateLeadStatus,
				removeLead,
				resetLeadsStatus,
			}}
		>
			{children}
		</LeadsContext.Provider>
	);
}

function useLeads(): LeadsContextData {
	const context = useContext(LeadsContext);

	if (!context) throw new Error('useLead must be used within an LeadProvider');

	return context;
}

export { LeadsProvider, useLeads };
