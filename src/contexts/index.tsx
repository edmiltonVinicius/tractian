import { ReactNode } from 'react';
import UnitContextProvider from './unitContext';
import WorkOrderContextProvider from './workOrderContext';

export const ContextProvider = ({ children }: { children: ReactNode }) => {
	return (
		<UnitContextProvider>
			<WorkOrderContextProvider>{children}</WorkOrderContextProvider>
		</UnitContextProvider>
	);
};
