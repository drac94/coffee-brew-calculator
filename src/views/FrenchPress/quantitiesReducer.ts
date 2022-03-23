type QuantitiesState = {
  cups: number;
  coffee: number;
  water: number;
  concentration: number;
};

type QuantitiesAction =
  | { type: 'increaseCups'; payload: number }
  | { type: 'increaseCoffee'; payload: number }
  | { type: 'increaseWater'; payload: number }
  | { type: 'changeConcentration'; payload: number };

export const actions: {
  [key: string]:
    | 'increaseCups'
    | 'increaseCoffee'
    | 'increaseWater'
    | 'changeConcentration';
} = {
  cups: 'increaseCups',
  coffee: 'increaseCoffee',
  water: 'increaseWater',
  concentration: 'changeConcentration',
};

export const initialQuantities = {
  cups: 1,
  coffee: 16,
  water: 236,
  concentration: 14,
};

export const quantitiesReducer = (
  state: QuantitiesState,
  action: QuantitiesAction
) => {
  const { type, payload } = action;
  switch (type) {
    case actions.cups:
      return {
        ...state,
        cups: payload,
        coffee: Math.round(
          (payload * initialQuantities.water) / state.concentration
        ),
        water: Math.round(payload * initialQuantities.water),
      };
    case actions.coffee:
      return {
        ...state,
        cups: Math.round(
          payload / (initialQuantities.water / state.concentration)
        ),
        coffee: payload,
        water: Math.round(
          (payload * initialQuantities.water) /
            (initialQuantities.water / state.concentration)
        ),
      };
    case actions.water:
      return {
        ...state,
        cups: Math.round(
          (payload * initialQuantities.cups) / initialQuantities.water
        ),
        coffee: Math.round(
          (payload * (initialQuantities.water / state.concentration)) /
            initialQuantities.water
        ),
        water: payload,
      };
    case actions.concentration:
      return {
        ...state,
        concentration: payload,
        coffee: Math.round(state.water / payload),
      };
    default:
      return state;
  }
};
