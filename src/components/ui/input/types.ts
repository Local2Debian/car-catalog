
export interface InputAttrProps {
    placeholder?: string
}

export interface InputProps extends InputAttrProps {
    modelValue?: string
};

export interface InputEmits {
    'update:modelValue': [string]
    input: [Event]
    change: [Event]
    focus: [Event]
    blur: [Event]
};