import React, { FC } from 'react'

import { connect } from 'react-redux'

import type { RootState } from 'src/store/types'
import { Categories, loadAllCategories } from 'src/store/actions/app'

import UISelect from 'src/components/ui-select'

export type BizCategorySelectState = {
  categories: Categories
}

export type BizCategorySelectProps = {
  value?: string | ReadonlyArray<string> | number
  onInput?: (value: string) => void
}

const BizCategorySelect: FC<BizCategorySelectState & BizCategorySelectProps> = ({ value, categories, onInput }) => {
  const onProxyChange = (e: React.FormEvent<HTMLSelectElement>) => {
    onInput && onInput(((e.target as unknown) as { value: string }).value)
  }

  return (
    <UISelect
      {...categories}
      value={value}
      valueKey="id"
      labelKey="name"
      onChange={onProxyChange}
      onRefresh={loadAllCategories}
    />
  )
}

function mapStateToProps(state: RootState): BizCategorySelectState {
  return { categories: state.app.categories }
}

export default connect<BizCategorySelectState, {}, BizCategorySelectProps, RootState>(mapStateToProps)(
  BizCategorySelect,
)
