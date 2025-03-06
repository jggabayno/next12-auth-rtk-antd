import Form from 'antd/lib/form'
import dynamic from 'next/dynamic'

import { FormInstance } from 'antd/es/form/Form'
import { ValidateFormMessagesInterface } from '@/utilities/validateFormMessages'

const FormModal  = dynamic(() => import('@/components/formModal'))
const Input      = dynamic(() => import('@/components/input'))

export interface AppointmentFormConfigInterface {
  id: string;
  autoComplete: string;
  layout: string,
  className: string,
  requiredMark: boolean,
  validateMessages: ValidateFormMessagesInterface,
  form : FormInstance<any>,
  onFinish: (appointment: any) => void,
}

interface Props {
  formOptions: AppointmentFormConfigInterface;
  modalOptions: any;
  others: any;
}

const AppointmentFormModal : React.FC<Props> = (props) => {
 
  const { formOptions, modalOptions, others: { actionType } } = props;

  const isEditActionType = actionType === 'edit'

  return (
    <FormModal formOptions={formOptions} modalOptions={modalOptions}>
      
      <Form.Item label="First Name" name='first_name' rules={[{ required: true }]}>
        <Input/>
      </Form.Item>

      <Form.Item label="Middle Name" name='middle_name' rules={[{ required: true }]}>
        <Input/>
      </Form.Item>

      <Form.Item label="Last Name" name='last_name' rules={[{ required: true }]}>
        <Input/>
      </Form.Item>

      <Form.Item label="Email" name='email' rules={[{ required: true }, { type: 'email' }]}>
        <Input/>
      </Form.Item>

      {!isEditActionType && 
      <Form.Item
      label='Password'
      name="password"
      rules={[{ required: true, message: "Password Required" }]}
      >
      <Input type="password" />
      </Form.Item>
      }

      {!isEditActionType && 
      <Form.Item
      name="password_confirm"
      label="Confirm Password"
      dependencies={['password']}
      hasFeedback
      rules={[
        {
          required: true,
          message: 'Please confirm your password!',
        },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value || getFieldValue('password') === value) {
              return Promise.resolve();
            }
            return Promise.reject(new Error('The two passwords that you entered do not match!'));
          },
        }),
      ]}
      >
      <Input type='password' />
      </Form.Item>
      }
    </FormModal>
  )
}

export default AppointmentFormModal