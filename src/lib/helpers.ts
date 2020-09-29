import type { FC } from 'react'

/**
 * 获取组件显示名称
 *
 * @param Component 组件
 *
 * @return 组件名称
 */
export function getDisplayName(Component: FC) {
  return Component.displayName || Component.name || 'UnknownLayout'
}
