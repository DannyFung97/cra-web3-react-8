import React from 'react'
import { Flex } from '../atoms/Flex'
import { Checkbox } from '../atoms/Input'
import { Tdiv } from '../atoms/Text'
import { GeneralProps } from '../general'

interface CheckboxProps {
  isChecked: boolean
  setChecked: (checked: boolean) => void
  text: string
}

export const CheckboxOption: React.FC<CheckboxProps & GeneralProps> = ({ isChecked, setChecked, text, ...props }) => (
  <Flex {...props} itemsCenter>
    <Checkbox type="checkbox" checked={isChecked} onChange={(e) => setChecked(e.target.checked)} />
    <Tdiv primary textAlign="center" t3 pl={5}>
      {text}
    </Tdiv>
  </Flex>
)
