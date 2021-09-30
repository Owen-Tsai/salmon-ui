import type { VNode } from 'vue'

// all config options
export interface INotificationConfig {
  customClass?: string,
  useHTML?: boolean,
  duration?: number,
  title?: string,
  content?: string,
  offset?: number,
  onClose?: () => void,
  type?: NotificationType,
  position?: NotificationPosition,
  zIndex?: number,
  id?: string,
  icon?: VNode | (() => VNode)
}

export interface INotificationHandler {
  close: () => void
}

export type NotificationVm = Partial<VNode>

export type INotification = (options?: INotificationConfig) => INotificationHandler

export interface IMessageInstance {
  vm: NotificationVm
}

export type NotificationQueue = Array<IMessageInstance>

export type NotificationType =
  'success' | 'default' | 'warning' | 'error'

export type NotificationPosition =
  'top-right' | 'top-left' | 'bottom-left' | 'bottom-right'
