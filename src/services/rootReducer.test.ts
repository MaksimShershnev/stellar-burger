import { rootReducer } from './store';
import {
  ingredientsReducer,
  burgerConstructorReducer,
  feedsReducer,
  orderReducer,
  userReducer
} from './slices';

describe('rootReducer', () => {
  it('Тестирование работы rootReducer', () => {
    const testAction = { type: 'UNKNOWN_ACTION' };
    const state = rootReducer(undefined, testAction);

    expect(state).toEqual({
      ingredients: ingredientsReducer(undefined, testAction),
      feeds: feedsReducer(undefined, testAction),
      burgerConstructor: burgerConstructorReducer(undefined, testAction),
      user: userReducer(undefined, testAction),
      order: orderReducer(undefined, testAction)
    });
  });
});
