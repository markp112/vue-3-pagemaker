import { SiteAndUser } from '../types/site-and-user';
import { useStore } from '@/store/';

export const getSiteAndUserId = (): SiteAndUser => {
  const store = useStore();
  const siteAndUser = {
    siteId: store.getters.siteId,
    userId: store.getters.user.id,
  };
  return siteAndUser;
}
