import { useRouter } from 'next/router'
import React from 'react'


type Props = {}

const Channel = (props: Props) => {
  const {query} = useRouter()
  return (
    <div>Channel</div>
    
  )
}

export default Channel