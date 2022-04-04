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
  const dataReactions = await fetch(`https://slack.com/api/conversations.history?channel=${query.channel}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.API_KEY_PRO}`,
    }
  })
  const respuesta = await dataReactions.json()
  const dataFromChannel = respuesta.messages.filter((data: listReaction) => {
    if(data.client_msg_id  ){
        return data
    }
  })
  .map((dataFinal:{text: string, files: {files: []}, reactions: [], permalink: string, mp4_low: string}) => ({
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
  dataFromChannel.forEach((element:responseSlack) => {
    if(element.reactions) {
      const temp = element.reactions.filter((icon: {name: string, count: number}) => {
        if(icon.name === 'vote') {
          element.count = icon.count;
          realIcon.push(element);
        }
      })
      return temp;
    }
  });
  
  realIcon.sort((a:Count, b:Count): number => {
    if(a.count > b.count) {
      return -1; 
    }
    if(a.count < b.count) {
      return 1;
    } 
  });
  resp.status(200).json(realIcon)
}

export default messagesList