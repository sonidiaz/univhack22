import { NextApiRequest, NextApiResponse } from "next"
import fetch  from 'isomorphic-unfetch'
import Message from '../../components/Messages';

type listReaction = {
  text: string,
  client_msg_id: string
}

// interface DataPayload {
//   {text: string, files: {files: []}, reactions: []}
// }

const reactionsList = async (req:NextApiRequest, resp: NextApiResponse) =>  {
  const dataReactions = await fetch('https://slack.com/api/conversations.history?channel=C42DVMD2A', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer xoxp-137723501795-138471723862-1347649688770-cbda327d8290672d96f26b2bce832bd0',
    }
  })


  const respuesta = await dataReactions.json()
  const dataFromChannel = respuesta.messages.filter((data: listReaction) => {
    if(data.client_msg_id && data.text.includes('Concurso | ')){
        return data
    }
  })
  .map((dataFinal:any) => ({
    "message": dataFinal.text,
    "files": dataFinal.files ? dataFinal.files[0].thumb_360 : [],
    "reactions": dataFinal.reactions ? dataFinal.reactions : []
  }))
  resp.status(200).json(dataFromChannel)
}

export default reactionsList