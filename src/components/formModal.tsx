import dynamic from 'next/dynamic'

const Form = dynamic(() => import('antd/lib/form'))
const Modal = dynamic(() => import('antd/lib/modal'))
 
export default function FormModal(props: any): JSX.Element
{
    const {formOptions, modalOptions, children} = props;

  return (
    <Modal {...modalOptions}>
      <Form {...formOptions}>
          {children}
      </Form>
    </Modal>
  )
}
