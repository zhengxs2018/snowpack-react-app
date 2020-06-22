import React, { FC } from 'react'

export interface SelectItem {
  id: number | string
}

export interface SelectProps {
  value?: string | ReadonlyArray<string> | number
  placeholder?: string
  items: any[]
  loading?: boolean
  error?: boolean
  labelKey?: string
  valueKey?: string
  onChange?: (event: React.FormEvent<HTMLSelectElement>) => void
  onRefresh?: () => void | Promise<void>
}

const UISelect: FC<SelectProps> = (props) => {
  if (props.loading) {
    return <div>正在加载中...</div>
  }

  if (props.error) {
    return <div onClick={() => props.onRefresh && props.onRefresh()}>加载异常，点击重新加载</div>
  }

  const { items, valueKey = 'value', labelKey = 'label' } = props
  return (
    <select value={props.value} placeholder={props.placeholder ?? '请选择'} onChange={props.onChange}>
      <option value="">所有</option>
      {items.map((item) => (
        <option value={item[valueKey]} key={item[valueKey]}>
          {item[labelKey]}
        </option>
      ))}
    </select>
  )
}

export default UISelect
