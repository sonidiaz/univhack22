import { NextApiRequest, NextApiResponse } from "next"
import fetch  from 'isomorphic-unfetch'

type listReaction = {
  text: string,
  client_msg_id: string
}

interface Count {
  count: number
}

const messagesList = async (req:NextApiRequest, resp: NextApiResponse) =>  {
  
  const {query} = req;
  const dataReactions = await fetch(`https://slack.com/api/conversations.history?channel=${query.channel}&limit=200`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.API_KEY_PRO}`,
    }
  })
  const respuesta = await dataReactions.json()
  console.log(respuesta)
  const dataFromChannel: any = respuesta.messages.filter((data: listReaction) => {
    if(data.client_msg_id && data.type === 'message'){
        return data
    }
  })
  .map((dataFinal:any) => ({
    "message": dataFinal.text,
    "files": dataFinal.files ? dataFinal.files[0].thumb_360 : [],
    "reactions": dataFinal.reactions ? dataFinal.reactions : [],
    "permalink": dataFinal.files ? dataFinal.files[0].permalink : [],
    "mp4_low": dataFinal.files ? dataFinal.files[0].mp4 : ' ',
    "thumb_video": dataFinal.files ? dataFinal.files[0].thumb_video : ' '
  }))
  const realIcon: [] = [];
  interface responseSlack {
    reactions: [];
    count: number;
  }
  interface MainElement {
    reactions:any,
    count: any
  }
  dataFromChannel.forEach((element: any) => {
    if(element.reactions) {
      const temp = element.reactions.filter((icon: {name: string, count: number}) => {
        if(icon.name === 'vote') {
          element.count = icon.count;
          // @ts-ignore: Unreachable code error
          realIcon.push(element);
        }
      })
      return temp;
    }
  });
  
  realIcon.sort((a:Count, b:Count): any => {
    if(a.count > b.count) {
      return -1; 
    }
    if(a.count < b.count) {
      return 1;
    } 
  });
  console.log(realIcon)
  resp.status(200).json(realIcon)
}

export default messagesList