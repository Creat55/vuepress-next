import { inject } from 'vue'
import type { InjectionKey } from 'vue'

export const useClientData = <T = unknown>(
  key: InjectionKey<T>
): T | undefined => inject(key)
