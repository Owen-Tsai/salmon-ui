import type { VNode } from 'vue'

// full config options
export interface IMessageConfig {
  customClass?: string,
  useHTML?: boolean,
  duration?: number,
  message?: string,
  offset?: number,
  onClose?: () => void,
  type?: MessageType,
  zIndex?: number,
  id?: string
}

export interface IMessageHandler {
  close: () => void
}

export type MessageType = 'success' | 'warning' | 'error' | 'default'

// when instantiate message instance,
// users can either pass in an config object or the content alone
export type MessageOptions = IMessageConfig | string
export type TypedMessageOptions<T extends MessageType> =
  { type: T; } & Omit<IMessageConfig, 'type'>  | string

export type MessageVM = Partial<VNode>

export interface IMessage {
  (options?: MessageOptions) : IMessageHandler
  success: (options?: TypedMessageOptions<'success'>) => IMessageHandler
  warning: (options?: TypedMessageOptions<'warning'>) => IMessageHandler
  info: (options?: TypedMessageOptions<'default'>) => IMessageHandler
  error: (options?: TypedMessageOptions<'error'>) => IMessageHandler
  closeAll(): void
}

export interface IMessageInstance {
  vm: MessageVM
}

export type MessageInstanceQueue = Array<IMessageInstance>
