import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import React from 'react';

export function withValidation<
  TFieldValues extends FieldValues,
  TElement extends HTMLInputElement | HTMLTextAreaElement,
  TProps extends {
    onChange?: (e: React.ChangeEvent<TElement>) => void;
    errorMessage?: string | string[];
  },
>(
  FieldComponent: React.ForwardRefExoticComponent<
    TProps & React.RefAttributes<TElement>
  >,
  customChange?: (
    e: React.ChangeEvent<TElement>,
    field: { onChange: (value: unknown) => void },
    props?: TProps,
  ) => void,
) {
  return function ValidatedField({
    control,
    name,
    componentProps,
  }: {
    control: Control<TFieldValues>;
    name: Path<TFieldValues>;
    componentProps?: Omit<TProps, 'name' | 'onChange' | 'errorMessage'>;
  }) {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <FieldComponent
            {...(componentProps as TProps)}
            {...field}
            ref={field.ref as React.Ref<TElement>}
            name={name}
            errorMessage={fieldState.error?.message}
            onChange={(e: React.ChangeEvent<TElement>) =>
              customChange
                ? customChange(e, field, componentProps as TProps)
                : field.onChange(e)
            }
          />
        )}
      />
    );
  };
}
