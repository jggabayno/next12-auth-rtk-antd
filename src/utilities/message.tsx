import message from 'antd/lib/message'

const messageWithType : any = message

const makeMessage : React.FC<any> = ({content, level = 'info', duration = 4} : any) =>
{
  const isStringContent = typeof content === 'string'

  if (!isStringContent)
  {
    const errors = content?.response?.data?.error
    const uniqueErrors = [...new Set(Object.values(errors)?.flatMap((error => error)))]

    return uniqueErrors?.map((error : any) => messageWithType[level](error, [duration]))

  }

  return messageWithType[level](content, [duration])
}

export default makeMessage;