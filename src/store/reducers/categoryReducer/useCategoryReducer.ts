import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks';
import { setCategoriesAction } from '.';
import { CategoryType } from '../../../shared/types/CategoryTypes';

export const useCategoryReducer = () => {
  const dispatch = useDispatch();
  const { categories } = useAppSelector((state) => state.categoryReducer);

  const setCategories = (currentCategories: CategoryType[]) => {
    dispatch(setCategoriesAction(currentCategories));
  };

  return {
    categories,
    setCategories,
  };
};
