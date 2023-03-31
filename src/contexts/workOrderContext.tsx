import { createContext, ReactNode, useState } from 'react';

type WorkOrderContextProps = {
	orderWorkerSelected: number | null;
	onSelect: (idWorkOrder: number) => void;
	closeDetails: () => void;
};

export const WorkOrderContext = createContext<WorkOrderContextProps>(
	{} as WorkOrderContextProps
);

const WorkOrderContextProvider = ({ children }: { children: ReactNode }) => {
	const [orderWorkerSelected, setOrderWorkerSelected] = useState<
		number | null
	>(null);

	const onSelect = (idWorkOrder: number): void => {
		setOrderWorkerSelected(idWorkOrder);
	};

	const onClose = (): void => {
		setOrderWorkerSelected(null);
	};

	return (
		<WorkOrderContext.Provider
			value={{
				orderWorkerSelected,
				onSelect,
				closeDetails: onClose,
			}}
		>
			{children}
		</WorkOrderContext.Provider>
	);
};

export default WorkOrderContextProvider;
