import { FC, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from '../../services/store';
import {
  setIngredient,
  selectIngredient,
  selectIngredients,
  fetchIngredients
} from '../../services/slices/ingredientsSlice/ingredientsSlice';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const { id } = useParams();
  const ingredients = useSelector(selectIngredients);
  const ingredientData = useSelector(selectIngredient);

  useEffect(() => {
    if (!ingredients) {
      dispatch(fetchIngredients());
    }
    dispatch(setIngredient(id));
  }, [dispatch, ingredients, id]);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
