import { createContext, ReactNode, useState } from 'react';

type UnitContextProps = {
	unitSelected: number;
	changeUnitSelected: (newUnit: number) => void;
};

export const UnitContext = createContext<UnitContextProps>(
	{} as UnitContextProps
);

const UnitContextProvider = ({ children }: { children: ReactNode }) => {
	const [unitSelected, setUnitSelected] = useState<number>(1);

	const changeUnitSelected = (newUnit: number): void => {
		setUnitSelected(newUnit);
	};

	return (
		<UnitContext.Provider
			value={{
				unitSelected,
				changeUnitSelected,
			}}
		>
			{children}
		</UnitContext.Provider>
	);
};

export default UnitContextProvider;
