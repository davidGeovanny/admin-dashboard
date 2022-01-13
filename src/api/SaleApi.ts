import { PropsTopFromSales } from '../interfaces/DashboardInterface';
import adminApi from '../helpers/adminApi';

export const getTopFromSales = async <T,>({ endpoint, initDate, finalDate, params }: PropsTopFromSales): Promise<T | undefined> => {
  try {
    const { data } = await adminApi.get<T>(`/sales/${ endpoint }/`, { 
      params: { initDate, finalDate, ...params }
    });
    return data;
  } catch ( err ) {
    return undefined;
  }
}