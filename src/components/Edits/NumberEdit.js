import { TextField, InputAdornment, InputBaseComponentProps } from '@mui/material'
import { NumericFormat } from 'react-number-format'
import { forwardRef } from 'react'

const maxValue = 2147483647

const NumberFormatCustom = forwardRef(
    ({ onChange, value, formatNumber, allowDecimal, allowNegative, ...props }, ref) => {
        const adjustValue = current => {
            const adjusted = current === '' ? null : current
            return Number(adjusted) > maxValue ? maxValue.toString() : adjusted
        }

        return (
            <NumericFormat
                {...props}
                value={adjustValue(value)}
                getInputRef={ref}
                onValueChange={({ value: onChangeValue }) => {
                    onChange({ target: { value: adjustValue(onChangeValue) } })
                }}
                thousandSeparator={formatNumber ? '.' : undefined}
                decimalScale={allowDecimal ? undefined : 0}
                decimalSeparator={formatNumber ? ',' : undefined}
                allowNegative={allowNegative}
                valueIsNumericString
            />
        )
    }
)

/**
 * This Component is used to edit a number value.
 *
 * It's **Value-Prop needs to be passed as a String** because of how React works.
 * 0 as number will not be passed, because it will be evaluated as falsy.
 * 0 as string will be passed, because it will be evaluated as truthy.
 *
 * @example
 * <NumberEdit value={String(numberValue)} ... />
 */
export const NumberEdit = ({
    label,
    field,
    value,
    onChange,
    autoFocus = false,
    adorner,
    disabled,
    formatNumber = true,
    allowDecimal = true,
    allowNegative = true,
    variant = 'contained',
    ...props
}) => {
    const id = `id-${field}`

    return (
        <TextField
            id={id}
            value={value}
            label={label}
            autoFocus={autoFocus}
            onChange={event => {
                const newValue = event.target.value ? Number(event.target.value) : null
                onChange(field)(newValue)
            }}
            disabled={disabled}
            InputLabelProps={{
                sx: { pr: adorner ? '60px' : '0px' },
            }}
            InputProps={{
                // TODO Braucht n Review
                inputComponent: NumberFormatCustom,
                endAdornment: adorner && (
                    <InputAdornment position='end' style={{ padding: 0 }}>
                        {adorner}
                    </InputAdornment>
                ),
                inputProps: {
                    formatNumber,
                    allowDecimal,
                    allowNegative,
                    style: { textAlign: 'right' },
                    ...props,
                },
            }}
            inputProps={{
                'aria-labelledby': `${id}-label`,
            }}
            {...props}
        />
    )
}
