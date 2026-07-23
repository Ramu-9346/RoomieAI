import homeData from '@mock/home.json';

import type { IHomeService, HomeData } from '../../interfaces/IHomeService';

export class StaticHomeService implements IHomeService {
  async getHomeData(_flatId: string): Promise<HomeData> {
    return homeData as unknown as HomeData;
  }
}
