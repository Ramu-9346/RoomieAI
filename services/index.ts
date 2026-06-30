export { RestaurantService, OrderService, HomeService } from './factory';

// Interface re-exports (for type usage in hooks and components)
export type { IRestaurantService, RestaurantSearchParams } from './interfaces/IRestaurantService';
export type { IOrderService, PlaceOrderParams }            from './interfaces/IOrderService';
export type { IOrderService as IOrderSvc }                 from './interfaces/IOrderService';
export type { IChatService, SendMessageParams }            from './interfaces/IChatService';
export type { IPaymentService }                            from './interfaces/IPaymentService';
export type { IInstamartService }                          from './interfaces/IInstamartService';
export type { IDineoutService }                            from './interfaces/IDineoutService';
export type { INotificationService }                       from './interfaces/INotificationService';
export type { IHomeService, HomeData }                     from './interfaces/IHomeService';
export type { IAuthService }                               from './interfaces/IAuthService';
