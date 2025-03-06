export interface ValidateFormMessagesInterface {
  required: string;
  types: ValidateFormTypeMessagesType
}


interface ValidateFormTypeMessagesType {
  email: string;
  number: string;
}

const validateMessages : ValidateFormMessagesInterface = {
    required: '${label} is required',
    types: {
      email: '${label} is not a valid email',
      number: '${label} is not a valid number',
    }
  }

export default validateMessages