import type { IHomeService, HomeData }  from '../../interfaces/IHomeService';
import homeData                          from '@mock/home.json';

export class StaticHomeService implements IHomeService {
  async getHomeData(flatId: string): Promise<HomeData> {
    return homeData as unknown as HomeData;
  }
}
